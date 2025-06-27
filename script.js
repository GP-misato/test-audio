document.addEventListener('DOMContentLoaded', () => {
    const speakButton = document.getElementById('speak-button');
    const textToReadDiv = document.getElementById('text-to-read');
    const langSwitcher = document.getElementById('language-switcher');

    // 各言語のテキストデータ
    const translations = {
        'ja': {
            text: 'ここに読み上げたいテキストを入力します。この文章は、音声合成APIによって読み上げられるサンプルテキストです.\n\nWeb Speech APIは、ブラウザに組み込まれた音声合成機能を提供します。これにより、ウェブページ上でテキストを自然な音声で読み上げることができます.\n\nこの機能は、アクセシビリティの向上や、音声ガイド、学習ツールなど、様々な用途に活用できます.\n\n例えば、視覚に障がいのあるユーザーがウェブコンテンツを理解するのを助けたり、外国語学習者が発音を確認したりするのに役立ちます.\n\nまた、ユーザーインターフェースに音声フィードバックを追加することで、より直感的で使いやすい体験を提供することも可能です.\n\nWeb Speech APIは、話速や音程、声の種類などを細かく調整できるため、多様なニーズに対応できます.\n\nただし、ブラウザによってサポートされる言語や声の種類が異なる場合があるため、互換性を考慮した実装が重要。
このサンプルでは、日本語のテキストを読み上げていますが、他の言語にも対応可能です。
ぜひ、この機能を活用して、より豊かなウェブ体験を創造してください。
ご不明な点がありましたら、お気軽にお問い合わせください。
よろしくお願いいたします。
',
            lang: 'ja-JP'
        },
        'en': {
            text: 'Enter the text you want to read here. This sentence is a sample text to be read by the speech synthesis API.\n\nWeb Speech API provides built-in speech synthesis capabilities in browsers. This allows text to be read aloud in a natural voice on web pages.\n\nThis feature can be utilized for various purposes such as improving accessibility, voice guidance, and learning tools.\n\nFor example, it can help visually impaired users understand web content or assist foreign language learners in checking pronunciation.\n\nAdditionally, by adding voice feedback to the user interface, it is possible to provide a more intuitive and user-friendly experience.\n\nWeb Speech API allows for fine-tuning of speech rate, pitch, voice type, etc., thus meeting diverse needs.\n\nHowever, since the supported languages and voice types may vary depending on the browser, it is important to implement with compatibility in mind.\n\nIn this sample, Japanese text is read aloud, but it can also support other languages.\n\nPlease make use of this feature to create a richer web experience.\n\nIf you have any questions, please feel free to contact us.\n\nThank you.\n',
            lang: 'en-US'
        },
        'zh-CN': {
            text: '在此输入您要阅读的文本。此句子是语音合成API将读取的示例文本。\n\nWeb Speech API在浏览器中提供内置的语音合成功能。这允许在网页上以自然语音朗读文本。\n\n此功能可用于各种目的，例如提高可访问性、语音指导和学习工具。\n\n例如，它可以帮助视障用户理解网页内容，或帮助外语学习者检查发音。\n\n此外，通过向用户界面添加语音反馈，可以提供更直观和用户友好的体验。\n\nWeb Speech API允许微调语速、音高、语音类型等，从而满足各种需求。
在此示例中，将朗读日文文本，但它也可以支持其他语言。
请利用此功能创建更丰富的网络体验。
如果您有任何疑问，请随时与我们联系。
谢谢。
',
            lang: 'zh-CN'
        },
        'zh-TW': {
            text: '在此輸入您要閱讀的文本。此句子是語音合成API將讀取的示例文本。\n\nWeb Speech API在瀏覽器中提供內建的語音合成功能。這允許在網頁上以自然語音朗讀文本。\n\n此功能可用於各種目的，例如提高可訪問性、語音指導和學習工具。\n\n例如，它可以幫助視障用戶理解網頁內容，或幫助外語學習者檢查發音。\n\n此外，通過向用戶界面添加語音反饋，可以提供更直觀和用戶友好的體驗。\n\nWeb Speech API允許微調語速、音高、語音類型等，從而滿足各種需求。
在此示例中，將朗讀日文文本，但它也可以支持其他語言。
請利用此功能創建更豐富的網絡體驗。
如果您有任何疑問，請隨時與我們聯繫。
謝謝。
',
            lang: 'zh-TW'
        },
        'ko': {
            text: '여기에 읽고 싶은 텍스트를 입력하십시오. 이 문장은 음성 합성 API가 읽을 샘플 텍스트입니다。\n\nWeb Speech API는 브라우저에 내장된 음성 합성 기능을 제공합니다. 이를 통해 웹 페이지에서 텍스트를 자연스러운 음성으로 읽을 수 있습니다.\n\n이 기능은 접근성 향상, 음성 안내, 학습 도구 등 다양한 목적으로 활용될 수 있습니다.\n\n예를 들어, 시각 장애가 있는 사용자가 웹 콘텐츠를 이해하는 데 도움을 주거나 외국어 학습자가 발음을 확인하는 데 도움이 될 수 있습니다.\n\n또한 사용자 인터페이스에 음성 피드백을 추가하여 보다 직관적이고 사용자 친화적인 경험을 제공할 수 있습니다.\n\nWeb Speech API는 말하기 속도, 음높이, 음성 유형 등을 세밀하게 조정할 수 있으므로 다양한 요구 사항을 충족할 수 있습니다。
그러나 지원되는 언어 및 음성 유형은 브라우저에 따라 다를 수 있으므로 호환성을 고려한 구현이 중요합니다。
이 샘플에서는 일본어 텍스트를 읽지만 다른 언어도 지원할 수 있습니다。
이 기능을 활용하여 더 풍부한 웹 경험を創造してください。
ご不明な点がありましたら、お気軽にお問い合わせください。
よろしくお願いいたします。
',
            lang: 'ko-KR'
        }
    };

    let currentLang = 'ja'; // 現在の言語を追跡
    let isSpeaking = false; // 再生状態を追跡
    let voices = []; // 利用可能な音声を格納する配列

    // 音声が利用可能になったときにvoices配列を更新
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        console.log('Voices loaded:', voices);
    };

    // 初期表示
    textToReadDiv.textContent = translations[currentLang].text;
    textToReadDiv.setAttribute('lang', translations[currentLang].lang); // lang属性を設定

    // 言語切り替えボタンのイベントリスナー
    langSwitcher.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            currentLang = event.target.dataset.lang;
            textToReadDiv.textContent = translations[currentLang].text;
            textToReadDiv.setAttribute('lang', translations[currentLang].lang); // lang属性を更新
            // 言語切り替え時に再生中であれば停止する
            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                window.speechSynthesis.cancel();
                isSpeaking = false;
                speakButton.style.opacity = '1'; // 透明度を元に戻す
            }
        }
    });

    // 読み上げボタンのイベントリスナー
    speakButton.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
            alert('お使いのブラウザはWeb Speech APIに対応していません。');
            return;
        }

        // 音声が再生中またはキューに入っている場合は停止
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            speakButton.style.opacity = '1'; // 透明度を元に戻す
            return; // 停止したので、ここで処理を終了
        }

        // 再生中でなければ開始
        const utterance = new SpeechSynthesisUtterance(textToReadDiv.textContent);
        const targetLang = translations[currentLang].lang; // 現在の言語を設定

        // 適切な音声を選択
        let selectedVoice = voices.find(voice => voice.lang === targetLang);

        if (!selectedVoice) {
            const langPrefix = targetLang.split('-')[0];
            selectedVoice = voices.find(voice => voice.lang.startsWith(langPrefix));
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log(`Using voice: ${selectedVoice.name} (${selectedVoice.lang})`);
        } else {
            utterance.lang = targetLang;
            console.warn(`No specific voice found for ${targetLang}. Falling back to lang property.`);
        }

        utterance.onstart = () => {
            isSpeaking = true;
            speakButton.style.opacity = '0.5';
        };

        utterance.onend = () => {
            isSpeaking = false;
            speakButton.style.opacity = '1';
        };

        utterance.onerror = (event) => {
            console.error('SpeechSynthesisUtterance.onerror', event);
            console.error('SpeechSynthesisUtterance error details:', event.error, event.message);
            isSpeaking = false;
            speakButton.style.opacity = '1';
        };

        // setTimeoutを削除し、直接speakを呼び出す
        window.speechSynthesis.speak(utterance);
    });
});