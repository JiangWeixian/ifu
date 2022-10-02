import { Action, List, ActionPanel, Icon } from "@raycast/api";
import { queryStatic7dRanges } from '@ifu/shared/logseq'

export default function Command() {
  return (
    <List searchBarAccessory={
      <List.Dropdown tooltip="Dropdown With Items">
        <List.Dropdown.Item title="Sunday(P) ~ Saturday" value="query-weekly" />
      </List.Dropdown>
    }>
      {queryStatic7dRanges().map(item => {
        return <List.Item icon={Icon.Calendar} key={item} title={item} actions={
          <ActionPanel>
            <Action.CopyToClipboard content={item} />
          </ActionPanel>
        } />
      })}
    </List>
  )
}