<div align="center">

<img src="https://github.com/deeplethe/solid-glass/raw/main/docs/banner-5.webp" alt="Solid Glass：为 AI 应用而生，由 DeepLethe 打造" width="820">

</div>

# Solid Glass

<div align="center">

[风格](#风格) · [安装](#安装) · [这里有什么](#这里有什么) · [贡献](#贡献)

[![Stars](https://img.shields.io/github/stars/deeplethe/solid-glass?style=flat-square&label=STARS&labelColor=161B22&color=FFC220&logo=github&logoColor=FFFFFF)](https://github.com/deeplethe/solid-glass/stargazers)
[![License](https://img.shields.io/badge/LICENSE-MIT-3FB950?style=flat-square&labelColor=161B22)](https://github.com/deeplethe/solid-glass/blob/main/LICENSE)
[![For AI applications](https://img.shields.io/badge/DESIGNED%20FOR-AI%20APPLICATIONS-8957E5?style=flat-square&labelColor=161B22)](https://deeplethe.github.io/solid-glass/docs/components/status-glyph)
[![shadcn/ui](https://img.shields.io/badge/BUILT%20ON-SHADCN%2FUI-F5F5F5?style=flat-square&labelColor=161B22&logo=shadcnui&logoColor=FFFFFF)](https://ui.shadcn.com)

[![Official site](https://img.shields.io/badge/OFFICIAL-SOLID%20GLASS-FFFFFF?style=flat-square&labelColor=161B22&logo=safari&logoColor=FFFFFF)](https://deeplethe.github.io/solid-glass)
[![Registry](https://img.shields.io/badge/REGISTRY-13%20ITEMS-8957E5?style=flat-square&labelColor=161B22)](https://deeplethe.github.io/solid-glass/r/registry.json)
[![Tailwind CSS](https://img.shields.io/badge/TAILWIND%20CSS-4-06B6D4?style=flat-square&labelColor=161B22&logo=tailwindcss&logoColor=FFFFFF)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/REACT-19-61DAFB?style=flat-square&labelColor=161B22&logo=react&logoColor=FFFFFF)](https://react.dev)
[![Built by DeepLethe](https://img.shields.io/badge/BUILT%20BY-DEEPLETHE-2D333B?style=flat-square&labelColor=161B22)](https://github.com/deeplethe)

</div>

一种精致的玻璃质感美学：远看坚实沉稳，近看才显出微妙的材料感。细腻的高光、纤细的边框与柔和的阴影营造出层次，而克制的表面处理把重点放在清晰、稳定与「实」的感觉上，而非通透、折射与流动。

[![一个用它搭出的智能体工作台：会话、对话流、文件与后台任务](https://github.com/deeplethe/solid-glass/raw/main/docs/screenshots/agent-workspace.webp)](https://deeplethe.github.io/solid-glass/blocks)

这是其中一个 [block](https://deeplethe.github.io/solid-glass/blocks)：用这些组件拼出的整屏界面，供你查看、阅读并直接复制。下面则是组件本身。

![深色主题下的组件](https://github.com/deeplethe/solid-glass/raw/main/docs/screenshots/home-dark-2.webp)

![浅色主题下的组件](https://github.com/deeplethe/solid-glass/raw/main/docs/screenshots/home-light-2.webp)

它站在扁平设计与液态玻璃之间。扁平是一块毫无质感可言的不透明方块；液态玻璃近乎透明，在文字很多的页面上，读者总在与背景争夺文字的清晰度。Solid Glass 只让轮廓透出来：足以让人知道这是玻璃，又不至于妨碍阅读。

![同一面板的三种形态：扁平、Solid Glass、液态玻璃](https://github.com/deeplethe/solid-glass/raw/main/docs/screenshots/compare.webp)

## 风格

| | |
|---|---|
| **触感** | 让人感觉可触的界面。每一次交互都带着微妙的触感与回应。 |
| **精确** | 干净的几何、考究的细节与克制的光照，营造出精确、技术化的美感。 |
| **体量** | 层次来自厚度、阴影与空间秩序，让每个元素都有物理上的存在感。 |
| **材质** | 细微的边缘高光、纤细的边框与柔和的阴影，勾勒出每一处表面的性格。 |

### 为何这样设计

AI 应用建立在不断变化的信息之上——回复不断涌入，智能体在执行任务，决策在等待人的输入。

Solid Glass 让界面保持安静、可读。中性的表面减少视觉干扰，层次建立秩序，而颜色与动效只留给有意义的反馈。

整套系统只用轻量 CSS 构建，并能在浅色与深色两种模式下与现有的 shadcn/ui 组件协同工作。

[材质](https://deeplethe.github.io/solid-glass/docs/material) 页展示了面板是如何做成的，[创建](https://deeplethe.github.io/solid-glass/create) 页则让你亲手拨动各项参数。

## 安装

Solid Glass 只是一份样式表。它通过 `data-slot` 和组件自身已有的类名找到 shadcn/ui 组件的每一部分，因此你手上的组件无需改动。

从一个 shadcn/ui 项目起步（React 19、Tailwind CSS 4、Base UI 组件）：

```bash
npx shadcn@latest init
```

直接从这个仓库添加样式表：

```bash
npx shadcn@latest add deeplethe/solid-glass/solid-glass
```

在 Tailwind 与 shadcn 的样式表之后引入它，并删掉 `shadcn init` 写下的 `:root` 与 `.dark` 颜色变量（Solid Glass 定义了同名的变量）：

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./solid-glass.css";
```

深色即设计本意的材质；浅色也同样可用。[安装页](https://deeplethe.github.io/solid-glass/docs/installation) 有其余说明。

Solid Glass 自有的组件用同样的方式安装：

```bash
npx shadcn@latest add deeplethe/solid-glass/status-glyph
```

| 组件 | 是什么 |
|---|---|
| `status-glyph` | 三点微光，表明一轮对话正在进行，以及它在做什么。 |
| `panel`、`tag`、`dot-loader` | 最薄的面板、一个小型标签，以及一排等待中的圆点。 |
| `turn-status`、`composer`、`tool-steps`、`diff-view`、`ask-card`、`context-ring`、`task-notice`、`reasoning` | 用于智能体工作的界面：它的状态栏、你向它输入内容的输入框、它采取的步骤、一份 diff、它提出的问题、上下文的充盈程度、来自任务的提醒，以及它的思考过程。 |

## 这里有什么

| 路径 | 是什么 |
|---|---|
| `src/solid-glass.css` | 主题。整套材质集中在一个文件里：颜色、三种玻璃厚度、唯一的状态、动效。它定义了 shadcn/ui 自己的变量名。 |
| `registry.json` | 注册表：`shadcn add` 安装的来源。由 `scripts/build-registry.mjs` 生成，它同时也为站点构建 `public/r/`。 |
| `src/components/ui/` | 站点展示的组件。shadcn/ui 的（Base UI，`base-nova`，用其命令行安装）以及 Solid Glass 自有的。shadcn/ui 中少数几个（`button`、`input`、`tabs`、`dialog`、`dropdown-menu`、`sheet`、`sidebar` 及部分表单控件）与官方版略有不同；样式表并不依赖这些差异。 |
| `src/create/`、`src/pages/create.tsx` | 创建页：把材质的各项参数（厚度、色调、图表色、类型、圆角、边缘、模糊）摊开，预览随每次选择即时更新，并给出由此产生的那几行 CSS。`options.ts` 说明每个选择会怎样改动样式表的变量；预览卡片用的是 shadcn/ui 的。 |
| `src/blocks/`、`src/pages/blocks.tsx` | 区块（blocks）：用组件拼出的整屏界面，在区块页以独立的框（`/view/<name>`）呈现。文件夹顶部的单个文件是 Solid Glass 自有的（`agent-workspace`），已收录进它的注册表；那些文件夹则是 shadcn/ui 的区块，装在材质里，从 shadcn/ui 安装而来。 |
| `src/examples/` | 每个示例一个小文件，如同 ui.shadcn.com 那样：shadcn/ui 自有的示例，以及 Solid Glass 为自有组件写的示例。 |
| `content/` | 文档。`components/` 是 shadcn/ui 对每个组件的页面；`solid/` 与 `docs/` 是 Solid Glass 的。 |
| `src/site/`、`src/pages/`、`src/home/` | 站点：页头、侧栏、组件预览，以及首页上那面卡片墙。 |
| `.github/` | 每个拉取请求必须通过的检查（`checks.yml`）、发布 `main` 的工作流（`pages.yml`），以及 issue 与拉取请求的模板。 |
| `scripts/build-docs.mjs` | 把 `content/` 转换为 `src/docs/generated.json`，由站点渲染。 |

## 运行

```bash
npm install
npm run dev         # http://localhost:5191
npm run build       # 输出到 dist/
npm run typecheck
```

`/dev/banner`（仅开发环境）是上方那张横幅，用主题绘制而成：`docs/banner-5.webp` 是它在一個 820×200 窗口里以两倍尺寸截下的图，与这里其他图片一样存为 WebP（同图 PNG 体积的四分之一）。图片有变动时，以递增的序号另存，并让 README 指向新文件：GitHub 对每个文件的图片只从一个地址提供，链接后加什么都不会变，而浏览器会缓存它已取到的内容。

`/dev/examples`（仅开发环境）一次性挂载所有示例，并列出其中任何失败的。它支持 `?q=button,card` 只显示部分、`?theme=light`、`?hover=<selector>` 以指针悬停的样式展示匹配项，以及 `?click=<selector>` 按下某元素查看它打开了什么。

`SOLID_GLASS_ORIGIN` 是站点的服务地址（Solid Glass 自有组件借此互相引用），`SOLID_GLASS_BASE` 是它在该地址下的路径；默认值即本仓库的 GitHub Pages。

## 添加一个 Solid Glass 自有组件

1. `src/components/ui/<name>.tsx`，按 shadcn/ui 组件的方式书写：函数式组件，每个部分带 `data-slot`，用 `@/lib/utils` 的 `cn()`。
2. `src/examples/<name>-demo.tsx`，以及每个进一步示例各一个文件。
3. `content/solid/<name>.mdx`：前置信息（`title`、`description`），然后是 `<ComponentPreview name="<name>-demo" />`、安装、用法，以及每个示例一个小节。

遵守四条规则（材质页有展示）：处理落在边缘；厚重而非轻飘；层次即厚度；唯一状态。

## 贡献

改动通过拉取请求落到 `dev`，并在维护者把 `dev` 合并进 `main` 时抵达 `main`，随之发布的站点与注册表也一并更新。[CONTRIBUTING.md](https://github.com/deeplethe/solid-glass/blob/main/CONTRIBUTING.md) 有其余说明
（[中文](https://github.com/deeplethe/solid-glass/blob/main/CONTRIBUTING.zh-CN.md)）：先为何事开 issue、推送前需运行什么，以及审查会打回什么。我们彼此相待的准则见 [行为准则](https://github.com/deeplethe/solid-glass/blob/main/CODE_OF_CONDUCT.md)；
安全相关报告请发往 [SECURITY.md](https://github.com/deeplethe/solid-glass/blob/main/SECURITY.md) 中的地址。

## 许可证

[MIT](https://github.com/deeplethe/solid-glass/blob/main/LICENSE)。来自 shadcn/ui 的组件、示例与组件文档归其作者所有，同样采用 MIT 许可证：见 [NOTICE.md](https://github.com/deeplethe/solid-glass/blob/main/NOTICE.md)。
