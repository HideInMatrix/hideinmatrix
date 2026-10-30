# GitHub Profile 配置

根目录的 `README.md` 用于 `HideInMatrix` 的 GitHub 个人主页。
网站开发说明已移到 [DEVELOPMENT.md](./DEVELOPMENT.md)。

## 页面与数据来源

- 顶部黄黑横幅：仓库中的 `assets/profile-header.svg`。
- README 打字动画：[readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg)，轮播主页与博客网址。图片保存在 `assets/profile-typing-*.svg`，左右各预留 24px；运行 `python3 scripts/update-profile-typing.py` 可重新生成。
- 技术栈与网站徽章：[Shields.io](https://shields.io/)。
- 统计与语言卡片：[GitHub Readme Stats Action](https://github.com/stats-organization/github-readme-stats-action)。旧的 `anuraghazra/github-readme-stats` 已停止维护，因此采用其推荐的后继生成器。
- 成就奖杯：[GitHub Profile Trophy](https://github.com/ryo-ma/github-profile-trophy)，固定到已核对的提交。
- 贪吃蛇：[Platane/snk](https://github.com/Platane/snk) 的 SVG 生成器。
- 3D 贡献日历：[github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib)，固定为 v0.9.3。

## 图片更新

`.github/workflows/profile-assets.yml` 在相关配置推送到 `master` 时首次运行，也可手动触发。
之后每天北京时间 04:23 左右刷新，GitHub 的计划任务可能延迟。

统计、奖杯、贪吃蛇和 3D 图分开生成。成功的图片会发布到独立的
`profile-assets` 分支，不会每天往源码分支添加图片提交。
单个生成器失败时，其他生成器仍能发布，已有的图片会保留。
首次生成必须成功后，相应的 README 图片链接才会可用。

工作流只使用 GitHub 自动提供的 `GITHUB_TOKEN`，无需配置私人 Token。
生成任务只有仓库读取权限；仅图片发布任务有写权限。
若仓库策略禁止 Actions 推送，工作流会明确失败，需由仓库所有者调整相应策略。

## 明暗主题

README 使用 GitHub 支持的 `<picture>` 与 `prefers-color-scheme`，跟随访问者
当前的 GitHub 明暗主题切换图片，不按时间判断白天或黑夜。

横幅、打字动画、徽章、统计卡片、奖杯、贪吃蛇与 3D 图均提供两套配色。
浅色主题使用浅灰背景 `#F6F8FA`、深色正文和深金色点缀；深色主题使用黑色背景
`#000000`、浅色正文和黄色点缀。没有匹配到主题的阅读器使用浅色版本作为默认图片。

`scripts/theme-profile-images.py` 在上游图片生成后产生 `*-light.svg` 和
`*-dark.svg`，保留原来的贡献数据和 SVG 动画。
3D 生成器的基础配置在 `.github/profile-3d.json`。
主页、博客和 GitHub 地址在 `src/content/site.ts`，README 中的链接也应同步修改。

## 网页打字动画

网站使用本地 React 组件 `src/components/TypingBanner.tsx`，不请求第三方打字服务。
循环输入与删除 `https://micromatrix.org` 和 `https://blog.micromatrix.org`。
横条预留最长网址的宽度；点击会进入当前显示的网址。
开启系统“减少动态效果”时显示静态网址并停止光标闪烁。
