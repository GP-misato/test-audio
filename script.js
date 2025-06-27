document.addEventListener('DOMContentLoaded', () => {
    const speakButton = document.getElementById('speak-button');
    const textToReadDiv = document.getElementById('text-to-read');
    const langSwitcher = document.getElementById('language-switcher');

    const translations = {
        'ja': {
            text: `こんにちは。これは日本語のサンプル文章です。Web Speech APIの読み上げ機能を使っています。`,
            lang: 'ja-JP'
        },
        'en': {
            text: `Hello. This is a sample sentence in English. It uses the Web Speech API for speech synthesis.`,
            lang: 'en-US'
        },
        'zh-CN': {
            text: `你好。这是中文简体的示例句子。它使用了Web Speech API的语音合成功能。`,
            lang: 'zh-CN'
        },
        'zh-TW': {
            text: `您好，這是一段繁體中文的範例文本，使用 Web Speech API 的語音功能。`,
            lang: 'zh-TW'
        },
        'ko': {
            text: `안녕하세요. 이것은 한국어 샘플 문장입니다. Web Speech API의 음성 합성 기능을 사용하고 있습니다.`,
            lang: 'ko-KR'
        }
    };

    const voiceMap = {
        'ja': 'Kyoko',
        'en': 'Samantha',
        'zh-CN': 'Ting-Ting',
        'zh-TW': 'Mei-Jia',
        'ko': 'Yuna'
    };

    let currentLang = 'ja';
    let isSpeaking = false;
    let voices = [];

    function loadVoicesSafely(callback) {
        voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            callback(voices);
        } else {
            speechSynthesis.onvoiceschanged = () => {
                voices = speechSynthesis.getVoices();
                callback(voices);
            };
        }
    }

    function updateText() {
        textToReadDiv.textContent = translations[currentLang].text;
        textToReadDiv.setAttribute('lang', translations[currentLang].lang);
    }
    updateText();

    langSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            currentLang = e.target.dataset.lang;
            updateText();

            if (speechSynthesis.speaking || speechSynthesis.pending) {
                speechSynthesis.cancel();
                isSpeaking = false;
                speakButton.style.opacity = '1';
            }
        }
    });

    speakButton.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
            alert('このブラウザは音声読み上げに対応していません。');
            return;
        }

        if (!isSpeaking) {
            loadVoicesSafely(() => {
                const { text, lang } = translations[currentLang];
                const utter = new SpeechSynthesisUtterance(text);

                const preferredVoiceName = voiceMap[currentLang];
                let selectedVoice = voices.find(v => v.name === preferredVoiceName);

                // フォールバック：lang一致のvoiceを探す（名前が一致しない場合）
                if (!selectedVoice) {
                    selectedVoice = voices.find(v => 
                        v.lang.toLowerCase() === lang.toLowerCase() ||
                        v.lang.toLowerCase().startsWith(lang.toLowerCase())
                    );
                }

                if (selectedVoice) {
                    utter.voice = selectedVoice;
                    console.log(`使用音声: ${selectedVoice.name} (${selectedVoice.lang})`);
                } else {
                    // それでも見つからない場合はlangだけ設定（fallback）
                    utter.lang = lang;
                    console.warn(`"${preferredVoiceName}" の音声が見つかりません。lang指定（${lang}）のみで読み上げます。`);
                }

                utter.onstart = () => {
                    isSpeaking = true;
                    speakButton.style.opacity = '0.5';
                };

                utter.onend = () => {
                    isSpeaking = false;
                    speakButton.style.opacity = '1';
                };

                utter.onerror = (e) => {
                    console.error('SpeechSynthesis error:', e);
                    isSpeaking = false;
                    speakButton.style.opacity = '1';
                };

                speechSynthesis.cancel();
                speechSynthesis.speak(utter);
            });
        } else {
            speechSynthesis.cancel();
            isSpeaking = false;
            speakButton.style.opacity = '1';
        }
    });
});
