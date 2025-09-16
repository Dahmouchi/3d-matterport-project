/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/send-email/route.ts
import sendEmail from "@/lib/sendemail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      message,
      city,
      objectives,
      surface,
      link,
    } = await req.json();

    // ============ ADMIN EMAIL ============
    const adminHtml = `
      
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de projet - Build360</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
    <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 30px; text-align: center;">
            <img src="https://build360.ma/images/logov1white.png" alt="Build360 Logo" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">🏗️ Nouvelle Demande de Projet</h1>
            <p style="color: #bdc3c7; margin: 10px 0 0 0; font-size: 14px;">
                Reçue le ${new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
            <div style="background-color: #f6ba13; color: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
                <h2 style="margin: 0; font-size: 18px; font-weight: 600;">Nouveau client potentiel à contacter !</h2>
            </div>
            
            <!-- Client Information -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #f6ba13; padding-bottom: 10px;">
                    👤 Informations Client
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; width: 140px; vertical-align: top;">Nom :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; vertical-align: top;">Email :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">
                            <a href="mailto:${email}" style="color: #f6ba13; text-decoration: none;">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; vertical-align: top;">Téléphone :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">
                            <a href="tel:${phone}" style="color: #f6ba13; text-decoration: none;">${phone}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; vertical-align: top;">Ville :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">${city}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Project Information -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #f6ba13; padding-bottom: 10px;">
                    🏗️ Détails du Projet
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; width: 140px; vertical-align: top;">Type de projet :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">
                            <span style="background-color: #f6ba13; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                                ${projectType}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; vertical-align: top;">Surface :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">${surface}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; vertical-align: top;">Objectifs :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">${objectives}</td>
                    </tr>
                    ${
                      link
                        ? `
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #2c3e50; vertical-align: top;">Lien projet :</td>
                        <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #e9ecef;">
                            <a href="${link}" target="_blank" style="color: #f6ba13; text-decoration: none;">${link}</a>
                        </td>
                    </tr>
                    `
                        : ""
                    }
                </table>
            </div>
            
            <!-- Message -->
            ${
              message
                ? `
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #f6ba13; padding-bottom: 10px;">
                    💬 Message du Client
                </h3>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #f6ba13;">
                    <p style="color: #555555; line-height: 1.6; margin: 0; font-style: italic;">
                        "${message}"
                    </p>
                </div>
            </div>
            `
                : ""
            }
            
            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}" style="background: linear-gradient(135deg, #f6ba13 0%, #e6a50f 100%); color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 8px; font-weight: 600; display: inline-block; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(246, 186, 19, 0.3);">
                    📧 Répondre par Email
                </a>
                <a href="tel:${phone}" style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 8px; font-weight: 600; display: inline-block; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);">
                    📞 Appeler
                </a>
            </div>
        </div>
        
       
    </div>
</body>
</html>

    `;

    await sendEmail(
      ["a.haoussi@build360.ma", "h.dahmouchi@build360.ma"],
      `New Appointment Request from ${name}`,
      adminHtml,
      email
    );

    // ============ USER CONFIRMATION EMAIL ============
    const userHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Merci pour votre demande - Build360</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 40px 30px; text-align: center;">
            <img src="https://build360.ma/images/logov1white.png" alt="Build360 Logo" style="height: 60px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Merci pour votre confiance !</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Bonjour ${name},</h2>
            
            <p style="color: #555555; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                Nous avons bien reçu votre demande de projet et nous vous remercions de nous avoir fait confiance pour votre projet de construction.
            </p>
            
            <div style="background-color: #f8f9fa; border-left: 4px solid #f6ba13; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #f6ba13; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Prochaines étapes :</h3>
                <ul style="color: #555555; margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li>Notre équipe va analyser votre demande dans les plus brefs délais</li>
                    <li>Nous vous contacterons sous 24-48h pour discuter de votre projet</li>
                    <li>Nous établirons ensemble un devis personnalisé</li>
                </ul>
            </div>
            
            <p style="color: #555555; line-height: 1.6; margin: 20px 0; font-size: 16px;">
                En attendant, n'hésitez pas à nous contacter si vous avez des questions supplémentaires.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="mailto:contact@build360.com" style="background: linear-gradient(135deg, #f6ba13 0%, #e6a50f 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 4px 15px rgba(246, 186, 19, 0.3);">
                    Nous contacter
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #2c3e50; padding: 30px; text-align: center;">
            <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Build360</p>
            <p style="color: #bdc3c7; margin: 0; font-size: 14px; line-height: 1.5;">
                Votre partenaire de confiance pour tous vos projets de construction<br>
                Email: contact@build360.com | Téléphone: +212 664-091068
            </p>
        </div>
    </div>
</body>
</html>
`;

    await sendEmail(
      email,
      "✅ Thank you for your request – Build360 Team",
      userHtml,
      "no-reply@build360.com"
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
