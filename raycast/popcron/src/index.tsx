import {
  ActionPanel,
  CopyToClipboardAction,
  List,
} from "@raycast/api";
import { useState } from "react";
import { popcron } from '@ifu/shared/popcron'

export default function Command() {
  const { state, search } = useSearch();

  return (
    <List isLoading={state.isLoading} onSearchTextChange={search} searchBarPlaceholder="Search by name..." throttle>
      <List.Section title="Results" subtitle={state.results.length + ""}>
        {state.results.map((searchResult, index) => (
          <SearchListItem key={index} searchResult={searchResult} />
        ))}
      </List.Section>
    </List>
  );
}

function SearchListItem({ searchResult }: { searchResult: SearchResult }) {
  return (
    <List.Item
      title={searchResult.title}
      actions={
        <ActionPanel>
         <CopyToClipboardAction
            title="Copy Install Command"
            content={searchResult.title}
            shortcut={{ modifiers: ["cmd"], key: "." }}
          />
        </ActionPanel>
      }
    />
  );
}

function useSearch() {
  const [state, setState] = useState<SearchState>({ results: [], isLoading: true });

  async function search(searchText: string) {
    setState({ isLoading: true, results: [] })
    try {
      const result = popcron.parse(searchText)
      setState({ results: [{ title: result }], isLoading: false })
    } catch (e) {
      setState({ results: [], isLoading: false })
    }
  }

  return {
    state: state,
    search: search,
  };
}

interface SearchState {
  results: SearchResult[];
  isLoading: boolean;
}

interface SearchResult {
  title: string
}
