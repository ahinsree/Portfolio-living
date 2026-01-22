"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Globe, Loader2, Volume2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Language {
    name: string;
    code: string;
}

const LANGUAGES: Language[] = [
    { name: "English", code: "en-US" },
    { name: "Hindi", code: "hi-IN" },
    { name: "Bengali", code: "bn-IN" },
    { name: "Telugu", code: "te-IN" },
    { name: "Marathi", code: "mr-IN" },
    { name: "Tamil", code: "ta-IN" },
    { name: "Gujarati", code: "gu-IN" },
    { name: "Urdu", code: "ur-IN" },
    { name: "Kannada", code: "kn-IN" },
    { name: "Odia", code: "or-IN" },
    { name: "Malayalam", code: "ml-IN" },
    { name: "Punjabi", code: "pa-IN" },
    { name: "Assamese", code: "as-IN" },
    { name: "Maithili", code: "mai-IN" },
    { name: "Santali", code: "sat-IN" },
    { name: "Kashmiri", code: "ks-IN" },
    { name: "Nepali", code: "ne-NP" },
    { name: "Konkani", code: "gom-IN" },
    { name: "Sindhi", code: "sd-IN" },
    { name: "Dogri", code: "doi-IN" },
    { name: "Manipuri", code: "mni-IN" },
    { name: "Bodo", code: "brx-IN" },
    { name: "Sanskrit", code: "sa-IN" },
];

interface BlogVoiceOutputProps {
    content: string;
    title: string;
}

const BlogVoiceOutput: React.FC<BlogVoiceOutputProps> = ({ content, title }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [translatedTitle, setTranslatedTitle] = useState<string | null>(null);
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [chunks, setChunks] = useState<string[]>([]);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(-1);
    const [volume, setVolume] = useState(1.0);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const isStoppingRef = useRef(false);

    // Effect to play chunks sequentially
    useEffect(() => {
        if (currentChunkIndex >= 0 && currentChunkIndex < chunks.length) {
            // Small delay between chunks to let the engine breathe
            const timer = setTimeout(() => {
                playChunk(chunks[currentChunkIndex]);
            }, 50);
            return () => clearTimeout(timer);
        } else if (currentChunkIndex >= chunks.length && chunks.length > 0) {
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentChunkIndex(-1);
            setChunks([]);
        }
    }, [currentChunkIndex, chunks]);

    useEffect(() => {
        if (!synth) return;

        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }
        loadVoices();

        // 15-second hang fix: Periodically resume the synth
        const resumeInterval = setInterval(() => {
            if (synth.speaking && !synth.paused) {
                synth.pause();
                synth.resume();
            }
        }, 10000);

        return () => {
            synth.cancel();
            clearInterval(resumeInterval);
        };
    }, [synth]);

    // Effect to update volume of currently playing utterance
    useEffect(() => {
        if (utteranceRef.current) {
            utteranceRef.current.volume = volume;

            // Fallback: If browser doesn't support real-time volume change,
            // we pause it at 0 to ensure silence.
            if (volume === 0 && isPlaying) {
                synth?.pause();
            } else if (volume > 0 && synth?.paused && isPlaying && !isPaused) {
                synth?.resume();
            }
        }
    }, [volume, synth, isPlaying, isPaused]);

    const handleTranslateAndPlay = async () => {
        // Mobile fix: Speech synthesis must be triggered by a direct user gesture.
        // We start an empty utterance immediately to "unlock" the audio context.
        if (synth && !isPlaying && !isPaused) {
            const unlockUtterance = new SpeechSynthesisUtterance("");
            unlockUtterance.volume = 0;
            synth.speak(unlockUtterance);
        }

        // If already playing the selected language, just resume or restart
        if (isPaused) {
            synth?.resume();
            setIsPaused(false);
            setIsPlaying(true);
            return;
        }

        if (isPlaying) {
            isStoppingRef.current = true;
            handleStop();
            return;
        }

        try {
            setIsTranslating(true);

            // Explicitly clear any pending speech
            isStoppingRef.current = true;
            if (synth) synth.cancel();
            setChunks([]);
            setCurrentChunkIndex(-1);
            isStoppingRef.current = false;

            let rawTextToSpeak = "";
            let rawTitleToSpeak = "";

            if (selectedLanguage.code.startsWith("en")) {
                rawTextToSpeak = content;
                rawTitleToSpeak = title;
            } else {
                const response = await fetch("/api/translate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content,
                        title,
                        targetLanguage: selectedLanguage.name,
                    }),
                });

                const data = await response.json();
                if (data.error) throw new Error(data.error);

                setTranslatedContent(data.translatedContent);
                setTranslatedTitle(data.translatedTitle);

                rawTextToSpeak = data.translatedContent;
                rawTitleToSpeak = data.translatedTitle;
            }

            // Robust cleaning: Decode HTML entities and remove problematic symbols
            const decodeHtml = (html: string) => {
                if (typeof document === 'undefined') return html;
                const txt = document.createElement("textarea");
                txt.innerHTML = html;
                return txt.value;
            };

            const cleanText = (text: string) => {
                return decodeHtml(text)
                    .replace(/<[^>]*>?/gm, "") // Ensure no tags left
                    .replace(/%/g, " percent ") // Make percent audible
                    .replace(/(\d)\.(\d)/g, "$1 point $2") // Make decimal points audible
                    .replace(/[#"'’“”]/g, " ") // Remove hashtags and all types of quotes
                    .replace(/\s+/g, " ")     // Clean up whitespace
                    .trim();
            };

            const combinedText = cleanText(rawTitleToSpeak) + ". " + cleanText(rawTextToSpeak);
            const newChunks = chunkText(combinedText);

            if (newChunks.length === 0) {
                console.warn("No text to speak");
                return;
            }

            // Delay setting chunks to ensure synth.cancel() finished
            setTimeout(() => {
                setChunks(newChunks);
                setCurrentChunkIndex(0);
            }, 100);
        } catch (error) {
            console.error("Translation/Playback error:", error);
            alert("Failed to translate or play audio. Please try again.");
        } finally {
            setIsTranslating(false);
        }
    };

    const chunkText = (text: string): string[] => {
        const maxLength = 160; // Shorter chunks are safer
        const chunks: string[] = [];
        const sentences = text.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [text];

        let currentChunk = "";
        for (const sentence of sentences) {
            if ((currentChunk + sentence).length > maxLength) {
                if (currentChunk) chunks.push(currentChunk.trim());

                if (sentence.length > maxLength) {
                    const words = sentence.split(/\s+/);
                    let wordChunk = "";
                    for (const word of words) {
                        if ((wordChunk + word).length > maxLength) {
                            chunks.push(wordChunk.trim());
                            wordChunk = word;
                        } else {
                            wordChunk += (wordChunk ? " " : "") + word;
                        }
                    }
                    currentChunk = wordChunk;
                } else {
                    currentChunk = sentence;
                }
            } else {
                currentChunk += (currentChunk ? " " : "") + sentence;
            }
        }
        if (currentChunk) chunks.push(currentChunk.trim());
        return chunks.filter(c => c.length > 0);
    };

    const playChunk = (text: string) => {
        if (!synth) return;

        const utterance = new SpeechSynthesisUtterance(text);
        const langCode = selectedLanguage.code;

        let voice = voices.find(v => v.lang === langCode || v.lang.startsWith(langCode + "-"));

        if (!voice) {
            const shortLang = langCode.split('-')[0];
            voice = voices.find(v => v.lang.startsWith(shortLang));
        }

        if (!voice) {
            voice = voices.find(v => v.lang.startsWith("en"));
        }

        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
        } else {
            utterance.lang = langCode;
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = volume;

        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setCurrentChunkIndex(prev => prev + 1);
        };

        utterance.onerror = (event) => {
            // "interrupted" is often intentional (from stop()) or system-triggered
            if (event.error === "interrupted") {
                setIsPlaying(false);
                setIsPaused(false);
                if (isStoppingRef.current) {
                    setCurrentChunkIndex(-1);
                    setChunks([]);
                }
                return;
            }

            console.error("Speech Error:", event.error, "| Lang:", utterance.lang);
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentChunkIndex(-1);
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
    };

    const handlePause = () => {
        if (synth && isPlaying) {
            synth.pause();
            setIsPaused(true);
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        if (synth) {
            isStoppingRef.current = true;
            synth.cancel();
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentChunkIndex(-1);
            setChunks([]);
            // Reset the ref after a short delay to allow events to process
            setTimeout(() => {
                isStoppingRef.current = false;
            }, 100);
        }
    };

    return (
        <div className="mb-12 p-6 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Volume2 size={24} />
                    </div>
                    <div>
                        <h4 className="font-sans font-bold text-gray-900 line-break-anywhere">Audio Experience</h4>
                        <p className="text-xs text-gray-400 font-medium whitespace-nowrap">Listen to this insight in your language</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
                    {/* Volume Control */}
                    <div className="relative flex items-center gap-2 group">
                        <button
                            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                            className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                            title="Adjust Volume"
                        >
                            <Volume2 size={18} />
                        </button>

                        <AnimatePresence>
                            {showVolumeSlider && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, x: -10 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, x: -10 }}
                                    className="absolute right-full mr-2 px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-xl flex items-center gap-3 z-50 min-w-[120px]"
                                >
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onInput={(e) => {
                                            const val = parseFloat((e.target as HTMLInputElement).value);
                                            setVolume(val);
                                            if (utteranceRef.current) {
                                                utteranceRef.current.volume = val;
                                                // Immediate response for silence
                                                if (val === 0 && isPlaying) {
                                                    synth?.pause();
                                                } else if (val > 0 && synth?.paused && isPlaying && !isPaused) {
                                                    synth?.resume();
                                                }
                                            }
                                        }}
                                        className="w-24 h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-[10px] font-bold text-gray-500 w-6">{Math.round(volume * 100)}%</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLangDropdown(!showLangDropdown)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:border-primary/30 transition-all shadow-sm"
                        >
                            <Globe size={16} className="text-primary" />
                            <span className="max-w-[80px] truncate">{selectedLanguage.name}</span>
                            <ChevronDown size={14} className={`transition-transform ${showLangDropdown ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {showLangDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full mb-2 right-0 md:left-0 w-48 max-h-64 overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-2 custom-scrollbar"
                                >
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setSelectedLanguage(lang);
                                                setShowLangDropdown(false);
                                                handleStop(); // Stop playing if language changes
                                            }}
                                            className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedLanguage.code === lang.code
                                                ? "bg-primary text-white"
                                                : "hover:bg-gray-50 text-gray-600"
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {!isPlaying && !isPaused ? (
                            <button
                                onClick={handleTranslateAndPlay}
                                disabled={isTranslating}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
                            >
                                {isTranslating ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Translating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play size={18} fill="currentColor" />
                                        <span>Listen Now</span>
                                    </>
                                )}
                            </button>
                        ) : (
                            <>
                                {isPlaying ? (
                                    <button
                                        onClick={handlePause}
                                        className="w-11 h-11 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg"
                                    >
                                        <Pause size={20} fill="currentColor" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleTranslateAndPlay}
                                        className="w-11 h-11 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg"
                                    >
                                        <Play size={20} fill="currentColor" />
                                    </button>
                                )}
                                <button
                                    onClick={handleStop}
                                    className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                                >
                                    <Square size={18} fill="currentColor" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Visual Feedback for translation being available */}
            <AnimatePresence>
                {translatedTitle && !isTranslating && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-50"
                    >
                        <div className="flex items-start gap-4">
                            <div className="mt-1 px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-md shrink-0">Translated</div>
                            <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-gray-900 mb-1 truncate" dangerouslySetInnerHTML={{ __html: translatedTitle }} />
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: translatedContent || "" }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};

export default BlogVoiceOutput;
