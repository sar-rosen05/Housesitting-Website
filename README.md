# Sarah's Housesitting

Website for Sarah's Housesitting, serving the Greater Seattle Area, WA.

## Structure

- `index.html` — Home page
- `about.html` — About page
- `services.html` — Services page
- `contact.html` — Contact page + cal.com booking widget
- `css/style.css` — All site styling
- `js/main.js` — Mobile nav toggle + footer year
- `images/` — Site images

## Local preview

Open `index.html` directly in a browser, or serve the folder locally:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Setting up online booking (cal.com)

1. Create a free account at [cal.com](https://cal.com).
2. Create an event type (e.g. "Housesitting Consult").
3. Open `contact.html` and find this line near the bottom:
   ```js
   var CAL_LINK = "your-username/your-event-slug";
   ```
4. Replace it with your real cal.com username/event slug, e.g. `"sarahsittings/consult"`.
5. Save, commit, and push — the booking calendar will appear on the Contact page.

## Deploying for free with GitHub Pages

1. On GitHub, go to the repo's **Settings > Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Choose the `main` branch and `/ (root)` folder, then **Save**.
4. GitHub will publish the site at `https://sar-rosen05.github.io/Housesitting-Website/` within a minute or two.

## Making edits

Edit the HTML/CSS/JS files directly, then:

```
git add -A
git commit -m "Describe your change"
git push
```
