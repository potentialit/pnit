    // --- BACKGROUND DATA & LOGIC ---
    const groupedCategories = {
        "Skincare": {
            "face_wash": { name: "Face wash / cleanser", fbAds: 17.5 },
            "serum": { name: "Serum / essence", fbAds: 15 },
            "moisturizer": { name: "Moisturizer / cream", fbAds: 17.5 },
            "sunscreen": { name: "Sunscreen / SPF", fbAds: 21.5 },
            "face_mask": { name: "Face mask / sheet mask", fbAds: 24 },
            "toner": { name: "Toner / mist", fbAds: 17.5 },
            "body_lotion": { name: "Body lotion / scrub", fbAds: 15 },
            "lip_care": { name: "Lip care / eye cream", fbAds: 12.5 },
            "skincare_kit": { name: "Skincare kit / bundle", fbAds: 18.5 }
        },
        "Makeup": {
            "foundation": { name: "Foundation / BB cream / CC cream", fbAds: 21.5 },
            "lipstick": { name: "Lipstick / lip gloss", fbAds: 15 },
            "eye_makeup": { name: "Eye makeup (kajal, liner, mascara)", fbAds: 14 },
            "blush": { name: "Blush / highlighter / bronzer", fbAds: 17 },
            "primer": { name: "Primer / setting spray", fbAds: 17.5 },
            "makeup_kit": { name: "Makeup kit / palette", fbAds: 21.5 }
        },
        "Powder & Hygiene": {
            "talcum": { name: "Talcum powder", fbAds: 12.5 },
            "face_powder": { name: "Face powder / compact", fbAds: 17 },
            "deodorant": { name: "Deodorant / perfume", fbAds: 15 },
            "sanitizer": { name: "Hand sanitizer / soap", fbAds: 10 }
        },
        "Hair Care": {
            "shampoo": { name: "Shampoo / conditioner", fbAds: 15 },
            "hair_oil": { name: "Hair oil / serum", fbAds: 14 },
            "hair_mask": { name: "Hair mask / treatment", fbAds: 17 },
            "hair_color": { name: "Hair color / dye", fbAds: 18.5 }
        },
        "Men's Grooming": {
            "mens_face_wash": { name: "Men's face wash / scrub", fbAds: 17.5 },
            "shaving": { name: "Shaving cream / aftershave", fbAds: 12.5 },
            "mens_kit": { name: "Men's grooming kit", fbAds: 17.5 }
        }
    };

    const backgroundCosts = {
        packaging: 0,
        platform: 0,
        ops: 0,
        returns: 0
    };

    const flatCategories = {};
    let currentRetailPrice = 0; // Tracks the current numerical price for the copy function

    // --- DOM ELEMENTS ---
    const categorySelect = document.getElementById('category');
    const cogsInput = document.getElementById('cogs');
    const targetProfitInput = document.getElementById('targetProfit');
    const finalPriceDisplay = document.getElementById('finalPrice');
    const finalMultiplierDisplay = document.getElementById('finalMultiplier');
    const copyBtn = document.getElementById('copyBtn');

    // --- INITIALIZATION ---
    function init() {
        for (const [groupName, items] of Object.entries(groupedCategories)) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = groupName;
            optgroup.style.fontWeight = 'bold'; 

            for (const [key, data] of Object.entries(items)) {
                flatCategories[key] = data; 
                const option = document.createElement('option');
                option.value = key;
                option.textContent = data.name;
                
                if (key === 'face_wash') {
                    option.selected = true;
                }
                
                optgroup.appendChild(option);
            }
            categorySelect.appendChild(optgroup);
        }
        
        calculatePrice();
    }

    // --- CALCULATION LOGIC ---
    function calculatePrice() {
        const cogs = parseFloat(cogsInput.value) || 0;
        const targetProfit = parseFloat(targetProfitInput.value) || 0;
        const selectedCategory = categorySelect.value;
        
        const fbAds = flatCategories[selectedCategory].fbAds;
        
        const totalDeductionsPercent = 
            fbAds + 
            backgroundCosts.packaging + 
            backgroundCosts.platform + 
            backgroundCosts.ops + 
            backgroundCosts.returns + 
            targetProfit;

        if (totalDeductionsPercent >= 100) {
            finalPriceDisplay.innerHTML = `<span class="text-danger fs-5">Invalid</span>`;
            finalMultiplierDisplay.innerHTML = `-`;
            currentRetailPrice = 0;
            copyBtn.disabled = true;
            return;
        }

        const retailPrice = cogs / (1 - (totalDeductionsPercent / 100));
        const multiplier = cogs > 0 ? (retailPrice / cogs) : 0; 
        
        // Update global variable for copy function (rounded to 0 decimals)
        currentRetailPrice = Math.round(retailPrice);

        finalPriceDisplay.innerHTML = `&#2547;${currentRetailPrice}`;
        finalMultiplierDisplay.innerHTML = `${multiplier.toFixed(2)}&times;`;
        copyBtn.disabled = false;
    }

    // --- EVENT LISTENERS ---
    cogsInput.addEventListener('input', calculatePrice);
    categorySelect.addEventListener('change', calculatePrice);
    targetProfitInput.addEventListener('input', calculatePrice);

    // --- COPY LOGIC ---
    copyBtn.addEventListener('click', () => {
        if (currentRetailPrice > 0) {
            const textToCopy = `এই প্রোডাক্টের অফার প্রাইস ${currentRetailPrice} টাকা\nঅথেনটিক প্রোডাক্টের স্টক সব সময় সীমিত থাকে তাই কোরিয়া থেকে মাসে একবার অর্ডার নিয়ে থাকি। দেরি না করে দ্রুত অর্ডার করতে পারেন।`;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = 'Copied!';
                copyBtn.classList.replace('btn-outline-success', 'btn-success');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.replace('btn-success', 'btn-outline-success');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Could not copy text. Please try again.');
            });
        }
    });

    // Run setup
    init();
