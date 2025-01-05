import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "LogJam🪵",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
  lightMode: {
    light: "#282a36",          # Dracula background color
    lightgray: "#44475a",      # Border color (slightly lighter than background)
    gray: "#6272a4",           # Graph links, heavier borders
    darkgray: "#f8f8f2",       # Body text (off-white)
    dark: "#ffffff",           # Header text and icons (pure white for contrast)
    secondary: "#8be9fd",      # Link color, current graph node (cyan)
    tertiary: "#50fa7b",       # Hover states and visited graph nodes (green)
    highlight: "rgba(255, 121, 198, 0.15)",  # Internal link background, highlighted text (pink with transparency)
    textHighlight: "#ff79c688",  # Markdown highlighted text background (light magenta)
  },
  darkMode: {
    light: "#282a36",          # Same as Dracula background
    lightgray: "#44475a",      # Darker gray for borders
    gray: "#6272a4",           # Graph links, heavier borders
    darkgray: "#f8f8f2",       # Body text (light text on dark)
    dark: "#ffffff",           # Header text and icons
    secondary: "#8be9fd",      # Cyan for links and active nodes
    tertiary: "#50fa7b",       # Green for hover and visited nodes
    highlight: "rgba(255, 121, 198, 0.15)",  # Highlighted lines of code
    textHighlight: "#ffb86c88",  # Orange for markdown text highlight
  },

    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
