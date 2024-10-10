// Mendapatkan elemen-elemen HTML
var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");

var modalContent = document.querySelector(".modal-content");
var modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Fungsi untuk menutup modal
function closeModal() {
    modal.style.display = "none";
}

// Fungsi untuk menghitung BMI dan menampilkan hasil
function calculate() {
    var isInputPage = document.getElementById("submit") !== null;

    // Memeriksa apakah semua kolom diisi (hanya pada halaman input)
    if (isInputPage && (age.value == '' || height.value == '' || weight.value == '' || (male.checked == false && female.checked == false))) {
        modal.style.display = "block";
        modalText.innerHTML = `Semua kolom harus diisi!`;
    } else {
        // Jika halaman input, hitung BMI
        if (isInputPage) {
            countBmi();
        }
    }
}

// Fungsi untuk menghitung BMI dan menampilkan hasil serta kalori harian
function countBmi() {
    // Mendapatkan nilai dari input
    var p = [age.value, height.value, weight.value];
    if (male.checked) {
        p.push("male");
    } else if (female.checked) {
        p.push("female");
    }

    // Menghitung BMI
    var bmi = Number(p[2]) / (Number(p[1]) / 100 * Number(p[1]) / 100);

    // Variabel untuk menyimpan hasil dan saran
    var result = '';
    var advice = '';
    var additionalCalories = 0;

    // Menentukan kategori BMI dan memberikan saran
    if (bmi < 18.5) {
        result = 'Underweight';
        advice = 'Makanlah lebih banyak untuk mencapai berat badan yang sehat.';
        additionalCalories = 500;
    } else if (18.5 <= bmi && bmi <= 24.9) {
        result = 'Healthy Weight';
        advice = 'Pertahankan pola makan yang sehat dan aktifitas fisik.';
    } else if (25 <= bmi && bmi <= 29.9) {
        result = 'Overweight';
        advice = 'Perlu usaha lebih dalam menjaga berat badan.';
        additionalCalories = -500;
    } else if (30 <= bmi && bmi <= 34.9) {
        result = 'Obese Class I';
        advice = 'Pertimbangkan untuk berkonsultasi dengan profesional kesehatan.';
        additionalCalories = -500;
    } else if (35 <= bmi && bmi <= 39.9) {
        result = 'Obese Class II';
        advice = 'Pertimbangkan untuk berkonsultasi dengan profesional kesehatan.';
        additionalCalories = -500;
    } else if (40 <= bmi) {
        result = 'Obese Class III';
        advice = 'Pertimbangkan untuk berkonsultasi dengan profesional kesehatan segera.';
        additionalCalories = -500;
    }

    // Menghitung kalori harian
    var calories = calculateCalories(Number(p[2]), Number(p[1]), Number(p[0]), p[3]) + additionalCalories;

    // Menghitung berat badan ideal
    var idealWeight = calculateIdealWeight(Number(p[1]), p[3]);

    // Menghitung waktu yang dibutuhkan untuk mencapai berat badan ideal
    var timeToIdealWeight = calculateTimeToIdealWeight(Number(p[2]), idealWeight, additionalCalories);

    // Membuat parameter URL untuk hasil BMI
    var urlParams = new URLSearchParams();
    urlParams.set('bmiResult', bmi.toFixed(2));
    urlParams.set('bmiClassification', result);
    urlParams.set('caloriesResult', calories.toFixed(0));
    urlParams.set('adviceResult', advice);
    urlParams.set('idealWeightResult', idealWeight);
    urlParams.set('timeToIdealWeight', timeToIdealWeight);

    // Redirect ke halaman result dengan parameter URL
    window.location.href = "result.html?" + urlParams.toString();
}

// Fungsi untuk menghitung kalori harian
function calculateCalories(weight, height, age, gender) {
    var calories;
    if (gender === "male") {
        calories = (88.4 + 13.4 * weight) + (4.8 * height) - (5.68 * age);
    } else if (gender === "female") {
        calories = (447.6 + 9.25 * weight) + (3.1 * height) - (4.33 * age);
    }
    return calories;
}

// Fungsi untuk menghitung berat badan ideal
function calculateIdealWeight(height, gender) {
    var idealWeight;
    if (gender === "male") {
        idealWeight = (height - 100) - ((height - 100) * 0.1);
    } else if (gender === "female") {
        idealWeight = (height - 100) - ((height - 100) * 0.15);
    }
    return idealWeight.toFixed(1);
}

// Fungsi untuk menghitung waktu yang dibutuhkan untuk mencapai berat badan ideal
function calculateTimeToIdealWeight(currentWeight, idealWeight, calorieAdjustment) {
    // Jika calorieAdjustment adalah 0, kembalikan 0 hari karena tidak perlu perubahan berat badan
    if (calorieAdjustment === 0) {
        return 0; // Tidak ada perubahan yang diperlukan
    }

    var weightDifference = Math.abs(parseFloat(currentWeight) - parseFloat(idealWeight));
    var caloriesPerKg = 7700; // Perkiraan kalori yang dibutuhkan untuk menambah/mengurangi 1 kg berat badan
    var totalCaloriesNeeded = weightDifference * caloriesPerKg;
    var daysNeeded = Math.ceil(totalCaloriesNeeded / Math.abs(calorieAdjustment));
    return daysNeeded;
}

// Fungsi untuk menghasilkan rencana diet dan olahraga
function generateHealthPlan(bmiClassification, calories) {
    var dietPlan = '';
    var exercisePlan = '';

    switch(bmiClassification) {
        case 'Underweight':
            dietPlan = 'Tingkatkan asupan kalori dengan makanan bernutrisi tinggi seperti kacang-kacangan, avokad, dan susu.';
            exercisePlan = 'Fokus pada latihan kekuatan untuk membangun massa otot.';
            break;
        case 'Healthy Weight':
            dietPlan = 'Pertahankan pola makan seimbang dengan banyak sayuran, buah-buahan, dan protein.';
            exercisePlan = 'Lakukan kombinasi latihan kardio dan kekuatan 2-5 kali seminggu.';
            break;
        case 'Overweight':
        case 'Obese Class I':
        case 'Obese Class II':
        case 'Obese Class III':
            dietPlan = 'Kurangi asupan kalori dengan menghindari makanan olahan dan minuman manis. Tingkatkan konsumsi serat.';
            exercisePlan = 'Mulai dengan aktivitas ringan seperti jalan kaki 30-60 menit sehari, lalu tingkatkan intensitas secara bertahap.';
            break;
    }

    return { diet: dietPlan, exercise: exercisePlan };
}

// Fungsi untuk menampilkan hasil di halaman result.html
function displayResults() {
    var urlParams = new URLSearchParams(window.location.search);
    
    document.getElementById('bmiResult').textContent = urlParams.get('bmiResult');
    document.getElementById('bmiClassification').textContent = urlParams.get('bmiClassification');
    document.getElementById('caloriesResult').textContent = urlParams.get('caloriesResult') + ' kkal';
    document.getElementById('adviceResult').textContent = urlParams.get('adviceResult');
    document.getElementById('idealWeightResult').textContent = urlParams.get('idealWeightResult') + ' kg';
    
    var timeToIdealWeight = urlParams.get('timeToIdealWeight');
    document.getElementById('timeToIdealWeight').textContent = timeToIdealWeight + ' hari';

    var healthPlan = generateHealthPlan(urlParams.get('bmiClassification'), urlParams.get('caloriesResult'));
    document.getElementById('dietPlan').textContent = healthPlan.diet;
    document.getElementById('exercisePlan').textContent = healthPlan.exercise;
}

// Event untuk menutup modal saat tombol close diklik
span.onclick = function () {
    modal.style.display = "none";
}

// Event untuk menutup modal saat klik di luar modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var collapseOpen = null;

function toggleCollapse(collapseNumber) {
    var content = document.getElementById("collapseContent" + collapseNumber);
    var icon = document.getElementById("icon" + collapseNumber);
    var judul = document.getElementById("judul" + collapseNumber);

    // Menutup collapse yang sedang terbuka
    if (collapseOpen !== null && collapseOpen !== collapseNumber) {
        var openContent = document.getElementById("collapseContent" + collapseOpen);
        var openIcon = document.getElementById("icon" + collapseOpen);
        var openJudul = document.getElementById("judul" + collapseOpen);

        openContent.classList.remove("show");
        openIcon.innerText = "+";
        openJudul.innerHTML = openJudul.innerText;
    }

    // Mengecek apakah collapse sedang terbuka atau tertutup
    var isCurrentlyOpen = content.classList.contains("show");

    // Menyimpan informasi collapse yang sedang terbuka
    collapseOpen = isCurrentlyOpen ? null : collapseNumber;

    // Mengubah status collapse yang sedang dipilih
    content.classList.toggle("show");
    icon.innerText = isCurrentlyOpen ? "+" : "-";
    judul.innerHTML = (isCurrentlyOpen) ? judul.innerText : "<strong>" + judul.innerText + "</strong>";
}

// Panggil fungsi displayResults saat halaman result.html dimuat
if (window.location.pathname.includes('result.html')) {
    window.onload = displayResults;
}
