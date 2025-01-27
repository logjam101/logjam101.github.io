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
    baseUrl: "logjam101.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: true,
    generateSocialImages: {
      colorScheme: "lightMode",
      width: 1200,
      height: 630,
      excludeRoot: false,
    },
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
          light: "#f8f8f2",
          lightgray: "#e0d7e6",
          gray: "#c2b5d5",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#9166cc",
          tertiary: "#674a87",
          highlight: "rgba(189, 147, 249, 0.15)",
          textHighlight: "#ffd6e888",
        },
        darkMode: {
          light: "#282a36",
          lightgray: "#44475a",
          gray: "#8f79b7",
          darkgray: "#f8f8f2",
          dark: "#ffffff",
          secondary: "#9775C7",
          tertiary: "#6272A4",
          highlight: "rgba(189, 147, 249, 0.15)",
          textHighlight: "#ffb86c88",
        },
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
