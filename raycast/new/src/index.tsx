import { ActionPanel, OpenInBrowserAction, Icon, List } from "@raycast/api";

import { shortcuts } from './constants'

export default function Command() {
  const items = shortcuts.map((item) => {
    return {
      id: item.name,
      title: item.name,
      subtitle: item.url,
    };
  });

  return (
    <List isLoading={false} searchBarPlaceholder="Filter by title...">
      {items.map((item) => (
        <List.Item
          key={item.id}
          icon="list-icon.png"
          title={item.title}
          subtitle={item.subtitle}
          accessoryIcon={{ source: Icon.Link }}
          actions={
            <ActionPanel>
              <OpenInBrowserAction url={item.subtitle} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
