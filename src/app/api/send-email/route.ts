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
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; color: #333;">
    <div style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); padding: 40px 30px; text-align: center; border-bottom: 5px solid #f6ba13;">
            <img src="https://build360.ma/images/logov1white.png" alt="Build360 Logo" style="height: 50px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">🚀 Nouveau Projet Potentiel</h1>
            <p style="color: #f6ba13; margin: 10px 0 0 0; font-size: 14px; font-weight: 500;">
                Reçu le ${new Date().toLocaleDateString("fr-FR", {
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
        <div style="padding: 40px 35px;">
            <div style="background-color: #fff9eb; border-left: 5px solid #f6ba13; padding: 20px; border-radius: 4px; margin-bottom: 35px;">
                <p style="margin: 0; color: #856404; font-size: 16px; font-weight: 600;">Une nouvelle opportunité vient d'arriver via le formulaire de contact !</p>
            </div>
            
            <!-- Client Info -->
            <div style="margin-bottom: 35px;">
                <h2 style="color: #1a1a1a; font-size: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center;">
                    <span style="background-color: #f6ba13; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-block; text-align: center; line-height: 30px; margin-right: 10px;">👤</span>
                    Coordonnées du Client
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; color: #777; width: 150px; font-weight: 500;">Nom complet :</td>
                        <td style="padding: 12px 0; color: #1a1a1a; font-weight: 700;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #777; font-weight: 500;">Email :</td>
                        <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #f6ba13; text-decoration: none; font-weight: 700;">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #777; font-weight: 500;">Téléphone :</td>
                        <td style="padding: 12px 0;"><a href="tel:${phone}" style="color: #f6ba13; text-decoration: none; font-weight: 700;">${phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #777; font-weight: 500;">Ville :</td>
                        <td style="padding: 12px 0; color: #1a1a1a; font-weight: 700;">${city}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Project Details -->
            <div style="margin-bottom: 35px;">
                <h2 style="color: #1a1a1a; font-size: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">
                    <span style="background-color: #f6ba13; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-block; text-align: center; line-height: 30px; margin-right: 10px;">🏗️</span>
                    Spécifications du Projet
                </h2>
                <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; color: #777; width: 150px;">Type :</td>
                            <td style="padding: 10px 0;"><span style="background-color: #1a1a1a; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${projectType}</span></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #777;">Surface :</td>
                            <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">${surface} m²</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #777; vertical-align: top;">Objectifs :</td>
                            <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">
                                ${Array.isArray(objectives) ? objectives.map(obj => `<span style="display: inline-block; background-color: #eee; padding: 2px 8px; margin: 2px; border-radius: 4px; font-size: 12px;">${obj}</span>`).join('') : objectives}
                            </td>
                        </tr>
                        ${link ? `
                        <tr>
                            <td style="padding: 10px 0; color: #777;">Lien projet :</td>
                            <td style="padding: 10px 0;"><a href="${link}" style="color: #f6ba13; text-decoration: none;">Voir le projet</a></td>
                        </tr>
                        ` : ''}
                    </table>
                </div>
            </div>
            
            <!-- Message -->
            ${message ? `
            <div style="margin-bottom: 35px;">
                <h2 style="color: #1a1a1a; font-size: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">
                    <span style="background-color: #f6ba13; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-block; text-align: center; line-height: 30px; margin-right: 10px;">💬</span>
                    Message Personnel
                </h2>
                <div style="background-color: #ffffff; border: 1px solid #eee; padding: 20px; border-radius: 8px; font-style: italic; color: #555; line-height: 1.6;">
                    "${message}"
                </div>
            </div>
            ` : ''}
            
            <!-- Actions -->
            <div style="text-align: center; margin-top: 40px;">
                <a href="mailto:${email}" style="background-color: #f6ba13; color: #ffffff; text-decoration: none; padding: 18px 35px; border-radius: 8px; font-weight: 700; font-size: 16px; display: inline-block; transition: all 0.3s; box-shadow: 0 5px 15px rgba(246, 186, 19, 0.4);">
                    RÉPONDRE AU CLIENT
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f9f9f9; padding: 25px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 12px;">
                Build360 Portal | Notifications Automatiques<br>
                © ${new Date().getFullYear()} Build360. Tous droits réservés.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    await sendEmail(
      ["elhassan.dahmouchi.pro@gmail.com", "contact@build360.ma", "haoussi.anass@gmail.com"],
      `New Project Request from ${name}`,
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
    <title>Confirmation de réception - Build360</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; color: #333;">
    <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); padding: 45px 30px; text-align: center; border-bottom: 5px solid #f6ba13;">
            <img src="https://build360.ma/images/logov1white.png" alt="Build360 Logo" style="height: 60px; margin-bottom: 25px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Merci pour votre confiance !</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 45px 35px;">
            <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Bonjour ${name},</h2>
            
            <p style="color: #555555; line-height: 1.8; margin: 0 0 30px 0; font-size: 16px;">
                Nous avons bien reçu votre demande de projet et nous vous remercions de l'intérêt que vous portez à <strong>Build360</strong>. Notre équipe d'experts est déjà en train d'analyser vos besoins.
            </p>
            
            <div style="background-color: #f9f9f9; border-radius: 12px; padding: 30px; margin: 40px 0; border-left: 5px solid #f6ba13;">
                <h3 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Prochaines étapes :</h3>
                <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
                    <span style="color: #f6ba13; font-weight: bold; margin-right: 15px; font-size: 20px;">01.</span>
                    <p style="margin: 0; color: #555; font-size: 15px;">Analyse technique de votre demande de projet.</p>
                </div>
                <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
                    <span style="color: #f6ba13; font-weight: bold; margin-right: 15px; font-size: 20px;">02.</span>
                    <p style="margin: 0; color: #555; font-size: 15px;">Appel de découverte sous 24 à 48 heures ouvrables.</p>
                </div>
                <div style="display: flex; align-items: flex-start;">
                    <span style="color: #f6ba13; font-weight: bold; margin-right: 15px; font-size: 20px;">03.</span>
                    <p style="margin: 0; color: #555; font-size: 15px;">Établissement d'un devis personnalisé et détaillé.</p>
                </div>
            </div>
            
            <p style="color: #555555; line-height: 1.8; margin: 30px 0; font-size: 16px;">
                Si vous avez des questions urgentes, n'hésitez pas à nous contacter directement.
            </p>
            
            <div style="text-align: center; margin: 45px 0;">
                <a href="https://build360.ma" style="background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 18px 35px; border-radius: 8px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                    VISITER NOTRE SITE
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #1a1a1a; padding: 40px 30px; text-align: center; color: #ffffff;">
            <p style="margin: 0 0 15px 0; font-size: 18px; font-weight: 700; letter-spacing: 1px;">BUILD360</p>
            <p style="color: #aaa; margin: 0; font-size: 13px; line-height: 1.6;">
                Votre partenaire de confiance pour des projets d'exception.<br>
                Casablanca, Maroc | <a href="mailto:contact@build360.ma" style="color: #f6ba13; text-decoration: none;">contact@build360.ma</a>
            </p>
            <div style="margin-top: 25px; border-top: 1px solid #333; padding-top: 25px;">
                <p style="color: #666; font-size: 11px; margin: 0;">
                    © ${new Date().getFullYear()} Build360. Tous droits réservés.
                </p>
            </div>
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
