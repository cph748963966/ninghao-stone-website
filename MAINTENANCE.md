# Website Maintenance Notes

## Product updates

- Main product data lives in `products.js`.
- The homepage product area is organized as 9 stone families in `window.MATERIALS`.
- Each stone family has a `heroImage` and a `forms` list.
- To add a new form, copy a compressed image into `assets/materials/`, then add one item to that stone family's `forms` array.

## Image rules

- Do not reference original generated PNG files directly from `.codex/generated_images`.
- Put website-ready images under `assets/` or `assets/materials/`.
- Keep homepage hero images around 250-400 KB when possible.
- Keep product/form images around 300-500 KB when possible.
- A good maximum size for product images is about 1200 px wide or tall.
- Prefer one strong image per stone family plus 4-6 form images. Avoid making a separate image for every tiny SKU unless it is truly needed.
- `index.html` keeps the original polished hero image. `index-hero-option3.html` is a comparison version using `assets/hero-rough-workshop-option-3.jpg`.

## Performance rules

- The homepage loads only the hero image immediately.
- Product card images and form gallery images use lazy loading.
- Shape/form images are inserted only after a stone family is selected.
- If the page starts feeling heavy, reduce image count first, then reduce image dimensions/quality.

## Quick local check

- Open `index.html` in a browser to preview the site.
- After editing data, confirm that every image path in `products.js` exists under `assets/materials/`.
- The contact form posts to FormSubmit at `ninghaostone@gmail.com`; the first live submission may require email confirmation.
