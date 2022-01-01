# 𝙞𝙛𝙪

𝘾𝙧𝙚𝙖𝙩𝙚 𝙬𝙤𝙧𝙠𝙛𝙡𝙤𝙬𝙨 𝙛𝙤𝙧 𝙚𝙢𝙤𝙟𝙞


![ifu](https://user-images.githubusercontent.com/6839576/147843066-35f0fd83-0f2e-431e-ae15-a117616fba88.png)


## development

**alfy-test** not support `.mjs` now, you should patch `run-node.sh`

```sh
+ node "@"
- ESM_OPTIONS='{"await":true}' node --require esm "$@"
```

- [alfy](https://github.com/sindresorhus/alfy)
- [Script Filter JSON Format](https://www.alfredapp.com/help/workflows/inputs/script-filter/json/)
