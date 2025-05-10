function bahoTahlili(baholar) {
    let summa = 0;
    let engYuqori = baholar[0];
    let engPast = baholar[0];
  
    let darajalar = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  
    for (let baho of baholar) {
      summa += baho;
  
      if (baho > engYuqori) engYuqori = baho;
      if (baho < engPast) engPast = baho;
  
      if (baho >= 90 && baho <= 100) darajalar.A++;
      else if (baho >= 80) darajalar.B++;
      else if (baho >= 70) darajalar.C++;
      else if (baho >= 60) darajalar.D++;
      else if (baho >= 0) darajalar.F++;
      else console.log("Noto‘g‘ri baho:", baho);
    }
  
    let ortacha = summa / baholar.length;
  
    return {
      "O'rtacha baho": ortacha.toFixed(2),
      "Eng yuqori baho": engYuqori,
      "Eng past baho": engPast,
      "A daraja": darajalar.A,
      "B daraja": darajalar.B,
      "C daraja": darajalar.C,
      "D daraja": darajalar.D,
      "F daraja": darajalar.F
    };
  }
  
  console.log(bahoTahlili([85, 92, 78, 63, 55, 100, 87, 45, 70, 88]));
  