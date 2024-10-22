/*!Copyright (C) GTranslate Inc.*/(function(){
    var gt=window.gtranslateSettings||{};
    gt=gt[document.currentScript.getAttribute('data-gt-widget-id')]||gt;

    // Define languages: Bengali, Hindi, English
    var lang_array_english = {
        "bn": "Bengali",
        "hi": "Hindi",
        "en": "English"
    };

    var lang_array_native = {
        "bn": "\u09AC\u09BE\u0982\u09B2\u09BE",
        "hi": "\u0939\u093f\u0928\u094d\u0926\u0940",
        "en": "English"
    };

    var default_language = "bn";  // Set Bengali as the default language
    var languages = ["bn", "hi", "en"]; // Only include Bengali, Hindi, and English
    var url_structure = gt.url_structure || 'none';
    var wrapper_selector = gt.wrapper_selector || '.gtranslate_wrapper';
    var select_language_label = gt.select_language_label || 'Select Language';
    var custom_css = gt.custom_css || '';

    // Create language dropdown
    var el_s = document.createElement('select');
    el_s.classList.add('gt_selector', 'notranslate');
    el_s.setAttribute('aria-label', select_language_label);

    // Add default option
    var el_o = document.createElement('option');
    el_o.value = '';
    el_o.innerText = select_language_label;
    el_s.appendChild(el_o);

    // Add language options
    languages.forEach(function(lang) {
        var el_o = document.createElement('option');
        el_o.value = default_language + '|' + lang;
        el_o.innerText = lang_array_native[lang];
        el_o.selected = (lang === default_language); // Set default language
        el_s.appendChild(el_o);
    });

    // Widget code
    var widget_code = el_s.outerHTML;

    if (url_structure == 'none') {
        widget_code += '<div id="google_translate_element2"></div>';
    }

    var add_css = document.createElement('style');
    add_css.classList.add('gtranslate_css');
    add_css.textContent = custom_css;
    document.head.appendChild(add_css);

    // Insert widget into the wrapper
    document.querySelectorAll(wrapper_selector).forEach(function(e) {
        e.innerHTML += widget_code;
    });

    window.doGTranslate = function(lang_pair) {
        if (lang_pair.value) lang_pair = lang_pair.value;
        if (lang_pair == '') return;

        var lang = lang_pair.split('|')[1];
        var teCombo;
        var sel = document.getElementsByTagName('select');

        for (var i = 0; i < sel.length; i++) {
            if (sel[i].className.indexOf('goog-te-combo') != -1) {
                teCombo = sel[i];
                break;
            }
        }

        if (teCombo) {
            teCombo.value = lang;
            teCombo.dispatchEvent(new Event('change'));
        }
    };

    window.googleTranslateElementInit2 = function() {
        new google.translate.TranslateElement({pageLanguage: default_language, autoDisplay: false}, 'google_translate_element2');
    };

    document.querySelectorAll('.gt_selector').forEach(function(e) {
        e.addEventListener('change', function(evt) {
            doGTranslate(evt.target.value);
        });
    });
})();
