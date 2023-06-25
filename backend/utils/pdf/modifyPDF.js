const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function modifyPDF(filename, data) {
  // Read the existing PDF file from the directory
  const pdfBytes = fs.readFileSync(filename);

  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();

  // Get the third page of the doucment
  const page1 = pages[0];
  const page3 = pages[2];

  // Get font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the height of the first page
  const height1 = page1.getSize().height;
  // Get the height of the third page
  const height3 = page3.getSize().height;

  // Get the width and height of the third page
  // const { width3, height3 } = page3.getSize();

  // Define blue color
  const blue = rgb(0, 0, 1);

  //Date
  page1.drawText(data.date, {
    x: 106,
    y: height1 - 89,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Site
  page1.drawText(data.site, {
    x: 200,
    y: height1 - 89,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Heure
  page1.drawText(data.heure, {
    x: 327,
    y: height1 - 89,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Directeur de plongée
  page1.drawText(data.director, {
    x: 106,
    y: height1 - 107,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Nombre de plongeurs
  page1.drawText(data.numberDiver, {
    x: 372,
    y: height1 - 122,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Surveillance de surface
  page1.drawText(data.surfaceSecurity, {
    x: 106,
    y: height1 - 144,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Téléphone du président
  page1.drawText(data.presidentTelephone, {
    x: 130,
    y: height1 - 156,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Téléphone du responsable
  page1.drawText(data.responsableTelephone, {
    x: 412,
    y: height1 - 156,
    size: 8,
    font: helveticaFont,
    color: blue,
  });

  //Palanquées
  data.palanquees.forEach((palanquee, index) => {
    if (index <= 5) {
      //Plongeurs de la palanquée
      palanquee.members.forEach((plongeur, index2) => {
        //Nom et prénom du plongeur
        page1.drawText(plongeur.nom + " " + plongeur.prenom, {
          x: 22,
          y:
            height1 -
            209 -
            index * (index === 4 ? 81 : index === 5 ? 79.8 : 82) -
            index2 * 11,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Fonction du plongeur
        page1.drawText(plongeur.fonction, {
          x: 165,
          y:
            height1 -
            209 -
            index * (index === 4 ? 81 : index === 5 ? 79.8 : 82) -
            index2 * 11,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Qualification du plongeur
        page1.drawText(plongeur.qualification, {
          x: 203,
          y:
            height1 -
            209 -
            index * (index === 4 ? 81 : index === 5 ? 79.8 : 82) -
            index2 * 11,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Technique d'exploration du plongeur
        page1.drawText(plongeur.tech_explo, {
          x: 235,
          y:
            height1 -
            209 -
            index * (index === 4 ? 81 : index === 5 ? 79.8 : 82) -
            index2 * 11,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Niveau de nitrox du plongeur
        page1.drawText(plongeur.nitrox, {
          x: 258,
          y:
            height1 -
            209 -
            index * (index === 4 ? 81 : index === 5 ? 79.8 : 82) -
            index2 * 11,
          size: 8,
          font: helveticaFont,
          color: blue,
        });
      });

      //Profondeur prévue de la palanquée
      page1.drawText(palanquee.parameters.meter_prevue, {
        x: 298,
        y: height1 - 209 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Profondeur réalisée de la palanquée
      page1.drawText(palanquee.parameters.meter_realise, {
        x: 343,
        y: height1 - 209 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure prévue de la palanquée
      page1.drawText(palanquee.parameters.minute_prevue, {
        x: 298,
        y: height1 - 220 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure réalisée de la palanquée
      page1.drawText(palanquee.parameters.minute_realise, {
        x: 343,
        y: height1 - 220 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Palier à 3m de la palanquée
      page1.drawText(palanquee.parameters.palier_3m, {
        x: 425,
        y: height1 - 209 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Palier à 6m de la palanquée
      page1.drawText(palanquee.parameters.palier_6m, {
        x: 425,
        y: height1 - 220 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Palier à 9m de la palanquée
      page1.drawText(palanquee.parameters.palier_9m, {
        x: 425,
        y: height1 - 231 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure de départ de la palanquée
      page1.drawText(palanquee.parameters.heure_depart, {
        x: 337,
        y: height1 - 242 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Minute de départ de la palanquée
      page1.drawText(palanquee.parameters.minute_depart, {
        x: 353,
        y: height1 - 242 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure de retour de la palanquée
      page1.drawText(palanquee.parameters.heure_retour, {
        x: 425,
        y: height1 - 242 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Minute de retour de la palanquée
      page1.drawText(palanquee.parameters.minute_retour, {
        x: 441,
        y: height1 - 242 - index * (index === 4 ? 81 : index === 5 ? 79.8 : 82),
        size: 8,
        font: helveticaFont,
        color: blue,
      });
    } else {
      palanquee.members.forEach((plongeur, index2) => {
        //Nom et prénom du plongeur
        page3.drawText(plongeur.nom + " " + plongeur.prenom, {
          x: 18,
          y: height3 - 73 - (index - 6) * 97 - index2 * 13,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Fonction du plongeur
        page3.drawText(plongeur.fonction, {
          x: 177,
          y: height3 - 73 - (index - 6) * 97 - index2 * 13,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Qualification du plongeur
        page3.drawText(plongeur.qualification, {
          x: 235,
          y: height3 - 73 - (index - 6) * 97 - index2 * 13,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Technique d'exploration du plongeur
        page3.drawText(plongeur.tech_explo, {
          x: 273,
          y: height3 - 73 - (index - 6) * 97 - index2 * 13,
          size: 8,
          font: helveticaFont,
          color: blue,
        });

        //Niveau de nitrox du plongeur
        page3.drawText(plongeur.nitrox, {
          x: 305,
          y: height3 - 73 - (index - 6) * 97 - index2 * 13,
          size: 8,
          font: helveticaFont,
          color: blue,
        });
      });

      //Profondeur prévue de la palanquée
      page3.drawText(palanquee.parameters.meter_prevue, {
        x: 355,
        y: height3 - 73 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Profondeur réalisée de la palanquée
      page3.drawText(palanquee.parameters.meter_realise, {
        x: 408,
        y: height3 - 73 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure prévue de la palanquée
      page3.drawText(palanquee.parameters.minute_prevue, {
        x: 355,
        y: height3 - 86 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure réalisée de la palanquée
      page3.drawText(palanquee.parameters.minute_realise, {
        x: 408,
        y: height3 - 86 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Palier à 3m de la palanquée
      page3.drawText(palanquee.parameters.palier_3m, {
        x: 490,
        y: height3 - 73 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Palier à 6m de la palanquée
      page3.drawText(palanquee.parameters.palier_6m, {
        x: 490,
        y: height3 - 86 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Palier à 9m de la palanquée
      page3.drawText(palanquee.parameters.palier_9m, {
        x: 490,
        y: height3 - 99 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure de départ de la palanquée
      page3.drawText(palanquee.parameters.heure_depart, {
        x: 400,
        y: height3 - 112,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Minute de départ de la palanquée
      page3.drawText(palanquee.parameters.minute_depart, {
        x: 417,
        y: height3 - 112 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Heure de retour de la palanquée
      page3.drawText(palanquee.parameters.heure_retour, {
        x: 500,
        y: height3 - 112 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });

      //Minute de retour de la palanquée
      page3.drawText(palanquee.parameters.minute_retour, {
        x: 517,
        y: height3 - 112 - (index - 6) * 97,
        size: 8,
        font: helveticaFont,
        color: blue,
      });
    }
  });

  page1.drawCircle({
    x: 331,
    y: height1 - 104,
    size: 5,
    borderWidth: 0.75,
    borderColor: blue,
    fillOpacity: 1,
  });

  // Serialize the modified PDF document to a Uint8Array
  const modifiedPdfBytes = await pdfDoc.save();

  // Generate a new filename for the modified PDF
  const fileBasename = path.basename(
    filename.replace(".pdf", "") + "_" + data.date
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
