let express = require("express");
const path = require("path");
let router = express.Router();
const modifyPDF = require("../../utils/pdf/modifyPDF.js");
const { json } = require("express");

module.exports = (db) => {
  router.get("/download/:dive", (req, res) => {
    const dive = req.params.dive;
    const pdfFilename = path.join(
      __dirname,
      "../../utils/pdf/Plongee_fiche_secu.pdf"
    ); // Replace with the actual PDF file name

    db.query(
      "SELECT dive.date_begin,\n" +
        "       dive_site.name,\n" +
        "       diver.last_name,\n" +
        "       diver.first_name,\n" +
        "       dive.place_number,\n" +
        "       dive.registered_place,\n" +
        "       dive.surface_security\n" +
        "FROM dive\n" +
        "INNER JOIN dive_site\n" +
        "ON dive.dive_site = dive_site.id\n" +
        "INNER JOIN diver\n" +
        "ON dive.director = diver.id\n" +
        "WHERE dive.id = ?",
      [dive],
      (err, result1) => {
        if (err) throw err;

        db.query(
          "SELECT id,\n" +
            "       max_depth AS meter_prevue,\n" +
            "       max_duration AS minute_prevue,\n" +
            "       actual_depth AS meter_realise,\n" +
            "       actual_duration AS minute_realise,\n" +
            "       dive_type AS tech_explo\n" +
            "FROM dive_team\n" +
            "WHERE dive = ?",
          [dive],
          (err, result2) => {
            if (err) throw err;

            db.query(
              "SELECT team,\n" +
                "       diver.last_name,\n" +
                "       diver.first_name,\n" +
                "       diver_role,\n" +
                "       diver_qualification.supervise AS pe,\n" +
                "       diver_qualification.autonomous AS pa,\n" +
                "       nitrox_qualification.name AS nitrox_qualification\n" +
                "FROM dive_team_member\n" +
                "    INNER JOIN diver\n" +
                "        ON dive_team_member.diver = diver.id\n" +
                "    INNER JOIN dive_team\n" +
                "        ON dive_team_member.team = dive_team.id\n" +
                "    INNER JOIN diver_qualification\n" +
                "        ON diver.diver_qualification = diver_qualification.id\n" +
                "    INNER JOIN nitrox_qualification\n" +
                "        ON diver.nitrox_qualification = nitrox_qualification.id\n" +
                "WHERE dive_team.dive = ?",
              [dive],
              (err, result3) => {
                if (err) throw err;

                // console.log(result1);
                // console.log(result2);
                // console.log(result3);

                const date_string = result1[0].date_begin;
                const date = new Date(date_string);

                const data = {
                  date: `${
                    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
                  }-${
                    date.getMonth() + 1 < 10
                      ? "0" + (date.getMonth() + 1)
                      : date.getMonth() + 1
                  }-${date.getFullYear()}`,
                  site: result1[0].name,
                  heure: `${
                    date.getHours() < 10
                      ? "0" + date.getHours()
                      : date.getHours()
                  }:${
                    date.getMinutes() < 10
                      ? "0" + date.getMinutes()
                      : date.getMinutes()
                  }`,
                  director: result1[0].last_name + " " + result1[0].first_name,
                  numberDiver: (
                    result1[0].place_number - result1[0].registered_place
                  ).toString(),
                  surfaceSecurity: result1[0].surface_security,
                  presidentTelephone: "06 06 06 06",
                  responsableTelephone: "06 06 06 06", //Pas de téléphone dans diver
                  palanquees: result2.map((palanquee) => {
                    return {
                      members: result3
                        .filter((member) => member.team === palanquee.id)
                        .map((member) => {
                          return {
                            nom: member.last_name,
                            prenom: member.first_name,
                            fonction: palanquee.tech_explo,
                            qualification:
                              palanquee.tech_explo === "autonome"
                                ? member.pa === null
                                  ? "Aucun"
                                  : "PA" + member.pa.toString()
                                : member.pe === null
                                ? "Aucun"
                                : "PE" + member.pe.toString(),
                            tech_explo:
                              palanquee.tech_explo === "autonome"
                                ? "Explo"
                                : "Tech",
                            nitrox:
                              member.nitrox_qualification === "Aucun"
                                ? "Aucun"
                                : member.nitrox_qualification === "NITROX"
                                ? "PN"
                                : member.nitrox_qualification === "NITROX"
                                ? "PN-C"
                                : "PN-C",
                          };
                        }),
                      parameters: {
                        meter_prevue: palanquee.meter_prevue.toString(),
                        minute_prevue: palanquee.minute_prevue.toString(),
                        meter_realise: palanquee.meter_realise.toString(),
                        minute_realise: palanquee.minute_realise.toString(),
                        palier_3m: "30", //Pas de palier dans bdd
                        palier_6m: "30", //Pas de palier dans bdd
                        palier_9m: "30", //Pas de palier dans bdd
                        heure_depart: "03",
                        minute_depart: "30",
                        heure_retour: "03",
                        minute_retour: "30",
                      },
                    };
                  }),
                };

                // res.json(data);

                modifyPDF(pdfFilename, data)
                  .then((modifiedFilename) => {
                    // Set the appropriate headers for the response
                    res.setHeader("Content-Type", "application/pdf");
                    res.setHeader(
                      "Content-Disposition",
                      `attachment; filename=${modifiedFilename}`
                    );

                    // Send the file data as the response
                    res.download(modifiedFilename);
                  })
                  .catch((error) => console.log("Error modifying PDF:", error));
              }
            );
          }
        );
      }
    );
  });

  router.get("/view", (req, res) => {
    res.send("PDF viewer");
  });
  return router;
};

// {
//   members: [
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//   ],
//   parameters: {
//     meter_prevue: "30",
//     minute_prevue: "30",
//     meter_realise: "30",
//     minute_realise: "30",
//     palier_3m: "30", //Pas de palier dans bdd
//     palier_6m: "30", //Pas de palier dans bdd
//     palier_9m: "30", //Pas de palier dans bdd
//     heure_depart: "03",
//     minute_depart: "30",
//     heure_retour: "03",
//     minute_retour: "30",
//   },
// },
// {
//   members: [
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//     {
//       nom: "Doe",
//       prenom: "John",
//       fonction: "Plongeur",
//       qualification: "N2",
//       tech_explo: "Tech",
//       nitrox: "30",
//     },
//   ],
//   parameters: {
//     meter_prevue: "30",
//     minute_prevue: "30",
//     meter_realise: "30",
//     minute_realise: "30",
//     palier_3m: "30",
//     palier_6m: "30",
//     palier_9m: "30",
//     heure_depart: "03",
//     minute_depart: "30",
//     heure_retour: "03",
//     minute_retour: "30",
//   },
// },
