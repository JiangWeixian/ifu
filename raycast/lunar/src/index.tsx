import { ActionPanel, CopyToClipboardAction, List, Icon } from "@raycast/api";
import { lunar } from '@ifu/shared/lunar'
import { compact } from 'lodash-es'

export default function Command() {
  const items = compact(lunar.info().list)

  return (
    <List isLoading={false} searchBarPlaceholder="Filter by title...">
      {items.map((item, index) => (
        <List.Item
          key={index}
          icon={Icon.Calendar}
          title={item.title}
          actions={
            <ActionPanel>
              <CopyToClipboardAction content={item.title} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
