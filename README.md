# 𝙞𝙛𝙪

*Some useful alfred workflows*


![ifu](https://user-images.githubusercontent.com/6839576/147843066-35f0fd83-0f2e-431e-ae15-a117616fba88.png)

- [@ifu/new](https://github.com/JiangWeixian/ifu/tree/master/packages/new) - open website shortcuts
- [@ifu/popcron](https://github.com/JiangWeixian/ifu/tree/master/packages/popcron) - translate cron
- [@ifu/emoji](https://github.com/JiangWeixian/ifu/tree/master/packages/emoji) - fuzzy search emoji
- [@ifu/lunar](https://github.com/JiangWeixian/ifu/tree/master/packages/lunar) - display lunar date
- [@ifu/daydayup](https://github.com/JiangWeixian/ifu/tree/master/packages/daydayup) - display common date like `now-timestamp`


## development

**alfy-test** not support `.mjs` now, you should patch `run-node.sh`

```diff
+ node "@"
- ESM_OPTIONS='{"await":true}' node --require esm "$@"
```

- [alfy](https://github.com/sindresorhus/alfy)
- [Script Filter JSON Format](https://www.alfredapp.com/help/workflows/inputs/script-filter/json/)
