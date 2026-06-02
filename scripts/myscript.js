const urunlerDB = {
    'cubuklu': { ad: '2026 Çubuklu Forma', fiyat: 1499, resim: '../img/cubuklu1.jpg', aciklama: 'Trabzonspor 2025-2026 sezonu klasik bordo-mavi çubuklu forması. Fırtına gibi esmek için tasarlandı.' },
    'deplasman': { ad: '2026 Beyaz Forma', fiyat: 1499, resim: '../img/deplasman1.jpg', aciklama: 'Deplasmanda asaletimizi yansıtan, bordo ve mavi detaylı beyaz formamız.' },
    'atki': { ad: 'Bordo Mavi Taraftar Atkısı', fiyat: 250, resim: '../img/atki1.jpg', aciklama: 'Tribünde 61. dakikada havaya kalkacak efsanevi dokuma taraftar atkısı.' },
    'sapka': { ad: 'TS Logolu Şapka', fiyat: 300, resim: '../img/sapka1.jpg', aciklama: 'Orijinal kulüp armalı, nefes alabilen yapısıyla şık bordo şapka.' }
};

document.addEventListener("DOMContentLoaded", function() {
    
    const quizBtn = document.getElementById("quiz-cevapla-btn");
    if(quizBtn) { quizBtn.addEventListener("click", quizKontrol); }

    const inceleButonlari = document.querySelectorAll(".incele-buton");
    inceleButonlari.forEach(btn => {
        btn.addEventListener("click", function() {
            let urunKodu = this.getAttribute("data-urun");
            let urun = urunlerDB[urunKodu];
            localStorage.setItem("aktifUrun", JSON.stringify(urun));
        });
    });

    if (window.location.pathname.includes("detay.html")) {
        let secilenUrun = JSON.parse(localStorage.getItem("aktifUrun"));
        if (secilenUrun) {
            document.querySelector(".detay-bilgi h2").innerText = secilenUrun.ad;
            document.querySelector(".fiyat").innerText = secilenUrun.fiyat + " TL";
            document.querySelector(".detay-resim img").src = secilenUrun.resim;
            document.getElementById("urun-aciklama").innerText = secilenUrun.aciklama;
        }

        const sepeteEkleBtn = document.getElementById("sepete-ekle-btn");
        if(sepeteEkleBtn) { sepeteEkleBtn.addEventListener("click", sepeteEkle); }
    }

    if (window.location.pathname.includes("sepet.html")) {
        sepetiGoster();
        const siparisiTamamlaBtn = document.getElementById("siparisi-tamamla-btn");
        if(siparisiTamamlaBtn) { siparisiTamamlaBtn.addEventListener("click", siparisiTamamla); }
    }
});

function sepetiGoster() {
    let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
    let tablo = document.querySelector(".sepet-tablo");
    let toplamAlan = document.getElementById("sepet-toplam");

    if (tablo) {
        while(tablo.rows.length > 1) { tablo.deleteRow(1); } 
        
        let toplam = 0;
        if (sepet.length === 0) {
            let row = tablo.insertRow();
            row.innerHTML = `<td colspan="5" class="bos-sepet-mesaji">Sepetiniz boş.</td>`;
        } else {
            sepet.forEach(urun => {
                let row = tablo.insertRow();
                row.innerHTML = `<td><img src="${urun.resim}" width="50"></td>
                                 <td>${urun.ad}</td>
                                 <td>Standart</td>
                                 <td>1</td>
                                 <td>${urun.fiyat} TL</td>`;
                toplam += parseInt(urun.fiyat);
            });
        }
        if(toplamAlan) toplamAlan.innerText = toplam;
    }
}

function sepeteEkle() {
    let urun = JSON.parse(localStorage.getItem("aktifUrun"));
    if(urun) {
        let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
        sepet.push(urun);
        localStorage.setItem("sepetim", JSON.stringify(sepet));
        alert("Ürün başarıyla sepetinize eklendi!");
    }
}

function siparisiTamamla() {
    let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
    if (sepet.length === 0) {
        alert("Sepetiniz zaten boş!");
    } else {
        alert("Siparişiniz başarıyla alındı! Teşekkür ederiz.");
        localStorage.removeItem("sepetim"); 
        sepetiGoster(); 
    }
}

function quizKontrol() {
    let dogruSayisi = 0;
    let toplamSoru = 5;

    for (let i = 1; i <= toplamSoru; i++) {
        let secenekler = document.getElementsByName('q' + i);
        for (let j = 0; j < secenekler.length; j++) {
            if (secenekler[j].checked && secenekler[j].value === "dogru") {
                dogruSayisi++;
            }
        }
    }

    let sonucAlani = document.getElementById("quiz-sonuc");
    sonucAlani.classList.remove("dogru-cevap", "yanlis-cevap");

    if (dogruSayisi === 5) {
        sonucAlani.innerText = "Tebrikler! 5'te 5 yaptınız. Bize her yer Trabzon!";
        sonucAlani.classList.add("dogru-cevap");
    } else if (dogruSayisi >= 3) {
        sonucAlani.innerText = "İyi iş! 5 sorudan " + dogruSayisi + " tanesini doğru bildiniz.";
        sonucAlani.classList.add("dogru-cevap");
    } else {
        sonucAlani.innerText = "Maalesef sadece " + dogruSayisi + " doğru. TS Club indirimini kaçırdınız.";
        sonucAlani.classList.add("yanlis-cevap");
    }
}