# @aiou/bin-template
*build npm cli command application*

[![npm](https://img.shields.io/npm/v/@aiou/bin-template)](https://github.com/spring-catponents/bin-template) [![GitHub](https://img.shields.io/npm/l/@aiou/bin-template)](https://github.com/spring-catponents/bin-template) [![stackblitz](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8Fstackblitz-online-blue)](https://stackblitz.com/github/spring-catponents/bin-template)

[Edit on StackBlitz ⚡️](https://stackblitz.com/github/spring-catponents/bin-template)

## features

- Use [**commander**](https://github.com/tj/commander.js/) build cli application
- Interaction interface with [**inquirer**](https://github.com/SBoudrias/Inquirer.js/) and [**ora**](https://github.com/sindresorhus/ora)
- Type safe

## install 

```console
npm install -g @aiou/bin-template
```

## commands

### `hello`

say hello world with select option

`bin-template hello [word]`

### `loading`

display loading and loading text

`bin-template loading --text=[text] [ms]`

## development

- `pnpm run dev`
