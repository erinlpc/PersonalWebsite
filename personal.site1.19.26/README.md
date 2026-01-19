# Erin Percival Carter - Personal Website

A Quarto-based academic website with integrated CV management and teaching materials.

## Quick Start

### Prerequisites

1. **Install R** from [CRAN](https://cran.r-project.org/)
2. **Install RStudio** from [Posit](https://posit.co/download/rstudio-desktop/)
3. **Install Quarto** from [quarto.org](https://quarto.org/docs/get-started/)

### Preview Locally

```bash
quarto preview
```

This will open a local preview in your browser that updates as you edit files.

### Build the Site

```bash
quarto render
```

This creates the `_site/` directory with the complete static website.

## File Structure

```
website/
├── _quarto.yml          # Site configuration (navigation, theme, etc.)
├── _data/
│   └── cv.yml           # CV data - edit this to update your CV
├── index.qmd            # Homepage
├── research.qmd         # Research page
├── cv.qmd               # CV page (renders from cv.yml)
├── bard.qmd             # BARD Institute page
├── contact.qmd          # Contact page
├── styles.css           # Custom CSS
├── images/              # Put your headshot and other images here
├── files/               # Downloadable files (CV PDF, etc.)
└── teaching/
    ├── index.qmd                    # Teaching overview
    ├── consumer-behavior/
    │   └── index.qmd
    ├── sales-management/
    │   └── index.qmd
    ├── marketing-research/
    │   ├── index.qmd
    │   └── assignments/             # Quarto-based coding assignments go here
    ├── time-management/
    │   └── index.qmd
    └── moral-judgment/
        └── index.qmd
```

## Updating Your CV

1. Edit `_data/cv.yml` with your new information
2. Run `quarto render`
3. Both the web CV and (once set up) the PDF will update automatically

## Adding Teaching Materials

### Adding a Coding Assignment (Quarto)

1. Create a new `.qmd` file in the appropriate course folder, e.g.:
   `teaching/marketing-research/assignments/assignment-01.qmd`

2. Add a link to it in the course's `index.qmd`

### Adding Lecture Videos

Add YouTube embed links to the relevant course page. Example:

```markdown
{{< video https://www.youtube.com/watch?v=VIDEO_ID >}}
```

### Linking Shiny Apps

Your apps on shinyapps.io can be linked directly:

```markdown
[App Name](https://your-account.shinyapps.io/app-name/)
```

Or embedded:

```markdown
{{< iframe https://your-account.shinyapps.io/app-name/ >}}
```

## Deployment

### Option 1: GitHub Pages (Recommended)

1. Create a GitHub repository
2. Push this folder to the repo
3. In repo Settings → Pages, set source to "GitHub Actions"
4. Add the Quarto publish action (Quarto docs have instructions)

### Option 2: Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `quarto render`
3. Set publish directory: `_site`

## Git Basics

The essential commands you'll use:

```bash
# Check what's changed
git status

# Stage all changes
git add .

# Commit with a message
git commit -m "Updated CV with new publication"

# Push to GitHub
git push
```

## Need Help?

- [Quarto Documentation](https://quarto.org/docs/guide/)
- [Quarto Websites Guide](https://quarto.org/docs/websites/)
- [R for Data Science](https://r4ds.hadley.nz/)
