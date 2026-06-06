const express = require("express");
const coms = require("./com.json");
const hash = require("./hash.json");
const puppeteer = require("puppeteer");
require("dotenv").config();

const app = express();
const PORT = 3000;

let browser, page;

const emailTwitter = process.env.TWITTER_EMAIL;
const motDePasseTwitter = process.env.TWITTER_PASSWORD;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Lancer le serveur
app.get("/", (req, res) => {
  res.send("Bot Twitter opérationnel");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Fonction pour initialiser Puppeteer
async function initPuppeteer() {
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }); // Ne pas en mode headless pour voir l'exécution
    page = await browser.newPage();

    // Aller sur Twitter et se connecter
    await page.goto("https://twitter.com/login");

    // Remplir le formulaire de connexion
    const emailInput = await page.waitForSelector(".r-30o5oe");
    await emailInput.type(emailTwitter, { delay: 40 });

    const nextButton = await page.waitForSelector(
      "#layers > div > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-14lw9ot.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div > div > button:nth-child(6)"
    );
    await nextButton.click();

    /*
    const userNameInput = await page.waitForSelector(
      "#layers > div > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-14lw9ot.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div.css-175oi2r.r-1mmae3n.r-1e084wi > label > div > div.css-175oi2r.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-is05cd.r-ttdzmv > div > input",
      { timeout: 30000 }
    );
    if (userNameInput) {
      await userNameInput.type(process.env.USER_NAME, { delay: 40 });
      const btnBBB = await page.waitForSelector(
        "#layers > div > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-14lw9ot.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div.css-175oi2r.r-1f0wa7y > div > div > div > button > div",
        { timeout: 60000 }
      );
      if (btnBBB) {
        await btnBBB.click();
      }
    }
    */

    const passwordInput = await page.waitForSelector(
      "#layers > div > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-14lw9ot.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div > div.css-175oi2r.r-1e084wi.r-13qz1uu > div > label > div > div.css-175oi2r.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-is05cd.r-ttdzmv > div.css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-135wba7.r-16dba41.r-1awozwy.r-6koalj.r-1inkyih.r-13qz1uu > input",
      { timeout: 100000 }
    );
    await passwordInput.type(motDePasseTwitter, { delay: 40 });

    const confirmButton = await page.waitForSelector(
      "#layers > div > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-14lw9ot.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div.css-175oi2r.r-1f0wa7y > div > div.css-175oi2r > div > div > button",
      { timeout: 60000 }
    );
    await confirmButton.click();

    await page.waitForSelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > header > div > div > div > div:nth-child(1) > div.css-175oi2r.r-15zivkp.r-1bymd8e.r-13qz1uu.r-1awozwy > nav > a:nth-child(3)",
      { timeout: 60000 }
    );

    // Scraper les tweets en temps réel
    await page.waitForSelector("article", { timeout: 60000 });

    const scrollToLoadMore = async (count = 3) => {
      for (let i = 0; i < count; i++) {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight);
        });
        await sleep(2000); // Attente pour laisser les nouveaux tweets se charger
      }
    };
    let comSended = 0;
    // Boucle pour vérifier les tweets
    while (true) {
      if (comSended >= 5) {
        const waitTime =
          Math.floor(Math.random() * (9 - 4 + 1) + 4) * 60 * 1000;
        await sleep(waitTime);
        comSended = 0;
      }
      try {
        const hashtag =
          hash.hashtags_mix[
            Math.floor(Math.random() * hash.hashtags_mix.length)
          ];
        const searchUrl = `https://twitter.com/search?q=%23${hashtag}&src=typed_query&f=top`; // Recherche en temps réel
        console.log(
          `Recherche de tweets avec le hashtag #${hashtag} en cours...`
        );

        await page.goto(searchUrl, { waitUntil: "networkidle2" });
        await page.waitForSelector("article", { timeout: 60000 });

        await scrollToLoadMore(5);
        const tweetHandles = await page.$$("article");
        console.log("tout les tweets trouvé:");
        console.log(tweetHandles);
        console.log(
          "-----------------------------------------------------------------------------------------"
        );

        const filteredTweets = [];
        await Promise.all(
          tweetHandles.map(async (tweetElement, i) => {
            try {
              const tweetText = await tweetHandles[i].evaluate(
                (el) => el.innerText
              );
              const timeElement = await tweetHandles[i].$("time");
              const tweetDate = timeElement
                ? await (await timeElement.getProperty("innerText")).jsonValue()
                : "";

              console.log("Text/:    " + tweetText);
              console.log("Date/:    " + tweetDate);

              const containsMonth = months.some((m) => tweetDate.includes(m));
              if (!containsMonth) {
                console.log("ce tweet est récent");
                console.log(tweetDate);
                filteredTweets.push(tweetElement);
                return tweetElement;
              } else {
                console.log("ce tweet est trop vieux !!");
                console.log(tweetDate);
                return null;
              }
            } catch (error) {
              console.error("Error while filtering:", error);
              return null;
            }
          })
        );

        // Maintenant on filtre les nulls

        console.log(filteredTweets);

        // Parcourir les tweets et commenter
        let commentaireEnvoye = 0;
        for (let i = 0; i < filteredTweets.length; i++) {
          if (commentaireEnvoye >= 2) break;

          const tweetText = await filteredTweets[i].evaluate(
            (el) => el.innerText
          );

          // Vérifier s'il s'agit d'un tweet avec un potentiel viral (par exemple, très populaire ou récent)
          if (tweetText.length > 50) {
            // Réagir en laissant un commentaire
            console.log("voici le tweet selectionné :");
            console.log(filteredTweets[i]);
            const replyButton = await filteredTweets[i].$(
              'button[data-testid="reply"]'
            );
            if (replyButton) {
              await replyButton.click();
            } else {
              console.log("Reply button non trouvé !");
            } // Cliquer sur le bouton "Répondre"
            await sleep(6000);
            const post = coms[Math.floor(Math.random() * coms.length)];
            await page.keyboard.type(post, { delay: 50 });
            await page.click('button[data-testid="tweetButton"]'); // Envoyer la réponse
            console.log("Commentaire envoyé !");
            commentaireEnvoye += 1;
            comSended += 1;
          }
        }
      } catch (error) {
        console.log(error.message);
      }

      await sleep(10000);
      console.log("Connexion Twitter réussie");
    }
  } catch (error) {
    console.log("erreur :  " + error.message);
  }
}

// Lancer Puppeteer et se connecter à Twitter
initPuppeteer();
