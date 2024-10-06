// Mendapatkan elemen-elemen HTML
var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
// let resultArea = document.querySelector(".comment");

modalContent = document.querySelector(".modal-content");
modalText = document.querySelector("#modalText");
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
    // buat variabel bb ideal

    // Menentukan kategori BMI dan memberikan saran
    if (bmi < 18.5) {
        result = 'Underweight';
        advice = 'Makanlah lebih banyak untuk mencapai berat badan yang sehat.';
        additionalCalories = 500; // Menambah 500 kalori untuk Underweight
    } else if (18.5 <= bmi && bmi <= 24.9) {
        result = 'Healthy Weight';
        advice = 'Pertahankan pola makan yang sehat dan aktifitas fisik.';
    } else if (25 <= bmi && bmi <= 29.9) {
        result = 'Overweight';
        advice = 'Perlu usaha lebih dalam menjaga berat badan.';
        additionalCalories = -500; // Mengurangi 100 kalori untuk Overweight
    } else if (30 <= bmi && bmi <= 34.9) {
        result = 'Obese Class I';
        advice = 'Pertimbangkan konsultasi dengan profesional kesehatan.';
        additionalCalories = -500; // Mengurangi 100 kalori untuk Overweight
    } else if (35 <= bmi && bmi <= 39.9) {
        result = 'Obese Class II';
        advice = 'Pertimbangkan konsultasi dengan profesional kesehatan.';
        additionalCalories = -500; // Mengurangi 100 kalori untuk Overweight
    } else if (40 <= bmi) {
        result = 'Obese Class III';
        advice = 'Pertimbangkan konsultasi dengan profesional kesehatan segera.';
        additionalCalories = -500; // Mengurangi 100 kalori untuk Overweight
    }

    // Menentukan bb ideal
    // tulis disini

// Menghitung kalori harian
var calories = calculateCalories(Number(p[2]), Number(p[1]), Number(p[0]), p[3]) + additionalCalories;

// Menghitung berat badan ideal
var idealWeight = calculateIdealWeight(Number(p[1]), p[3]);

// Membuat parameter URL untuk hasil BMI
var urlParams = new URLSearchParams();
urlParams.set('bmiResult', bmi.toFixed(2));
urlParams.set('bmiClassification', result);
urlParams.set('caloriesResult', calories.toFixed(0)); // Membulatkan ke bilangan bulat terdekat
urlParams.set('adviceResult', advice);
urlParams.set('idealWeightResult', idealWeight);

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
    return idealWeight.toFixed(1) + " kg";
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

