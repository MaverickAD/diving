const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function modifyPDF(filename, data) {
  // Read the existing PDF file from the directory
  const pdfBytes = fs.readFileSync(filename);

  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get the first page of the document
  const [page] = pdfDoc.getPages();

  // Get font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the width and height of the first page
  const { width, height } = page.getSize();

  // Define blue color
  const blue = rgb(0, 0, 1);

  //Date
  page.drawText(data.date, {
    x: 106,
    y: height - 89,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Site
  page.drawText(data.site, {
    x: 200,
    y: height - 89,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Heure
  page.drawText(data.heure, {
    x: 327,
    y: height - 89,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Directeur de plongée
  page.drawText(data.director, {
    x: 106,
    y: height - 107,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Nombre de plongeurs
  page.drawText(data.numberDiver, {
    x: 372,
    y: height - 122,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Surveillance de surface
  page.drawText(data.surfaceSecurity, {
    x: 106,
    y: height - 144,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Téléphone du président
  page.drawText(data.presidentTelephone, {
    x: 130,
    y: height - 156,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Téléphone du responsable
  page.drawText(data.responsableTelephone, {
    x: 412,
    y: height - 156,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Palanquées
  data.palanquees.forEach((palanquee, index) => {
    //Plongeurs de la palanquée
    palanquee.members.forEach((plongeur, index2) => {
      //Nom et prénom du plongeur
      page.drawText(plongeur.nom + " " + plongeur.prenom, {
        x: 22,
        y: height - 209 - index * 82 - index2 * 11,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Fonction du plongeur
      page.drawText(plongeur.fonction, {
        x: 165,
        y: height - 209 - index * 82 - index2 * 11,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Qualification du plongeur
      page.drawText(plongeur.qualification, {
        x: 210,
        y: height - 209 - index * 82 - index2 * 11,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Technique d'exploration du plongeur
      page.drawText(plongeur.tech_explo, {
        x: 235,
        y: height - 209 - index * 82 - index2 * 11,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Niveau de nitrox du plongeur
      page.drawText(plongeur.nitrox, {
        x: 263,
        y: height - 209 - index * 82 - index2 * 11,
        size: 8,
        font: helveticaFont,
        color: blue,
      });
    });

    //Profondeur prévue de la palanquée
    page.drawText(palanquee.parameters.meter_prevue, {
      x: 298,
      y: height - 209 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Profondeur réalisée de la palanquée
    page.drawText(palanquee.parameters.meter_realise, {
      x: 343,
      y: height - 209 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Heure prévue de la palanquée
    page.drawText(palanquee.parameters.minute_prevue, {
      x: 298,
      y: height - 220 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Heure réalisée de la palanquée
    page.drawText(palanquee.parameters.minute_realise, {
      x: 343,
      y: height - 220 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Palier à 3m de la palanquée
    page.drawText(palanquee.parameters.palier_3m, {
      x: 425,
      y: height - 209 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Palier à 6m de la palanquée
    page.drawText(palanquee.parameters.palier_6m, {
      x: 425,
      y: height - 220 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Palier à 9m de la palanquée
    page.drawText(palanquee.parameters.palier_9m, {
      x: 425,
      y: height - 231 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Heure de départ de la palanquée
    page.drawText(palanquee.parameters.heure_depart, {
      x: 337,
      y: height - 242 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Minute de départ de la palanquée
    page.drawText(palanquee.parameters.minute_depart, {
      x: 353,
      y: height - 242 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Heure de retour de la palanquée
    page.drawText(palanquee.parameters.heure_retour, {
      x: 425,
      y: height - 242 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });

    //Minute de retour de la palanquée
    page.drawText(palanquee.parameters.minute_retour, {
      x: 441,
      y: height - 242 - index * 82,
      size: 8,
      font: helveticaFont,
      color: blue,
    });
  });

  page.drawCircle({
    x: 331,
    y: height - 104,
    size: 5,
    borderWidth: 0.75,
    borderColor: blue,
    fillOpacity: 1,
  });

  // Serialize the modified PDF document to a Uint8Array
  const modifiedPdfBytes = await pdfDoc.save();

  // Generate a new filename for the modified PDF
  const fileBasename = path.basename(
    filename.replace(".pdf", "") + "_2023_06_16_16_46_41"
  );
  const modifiedFilename = path.join(
    path.join(__dirname, "../../public/pdf/modified"),
    `${fileBasename}.pdf`
  );

  console.log(fileBasename);

  // Write the modified PDF bytes to a new file
  fs.writeFileSync(modifiedFilename, modifiedPdfBytes);

  return modifiedFilename;
}

module.exports = modifyPDF;
