import alfy from 'alfy';

class Helper {
  static getDescendantProperty(object, path, list = []) {
    let firstSegment;
    let remaining;
    let dotIndex;
    let value;
    let index;
    let length;

    if (path) {
      dotIndex = path.indexOf('.');

      if (dotIndex === -1) {
        firstSegment = path;
      } else {
        firstSegment = path.slice(0, dotIndex);
        remaining = path.slice(dotIndex + 1);
      }

      value = object[firstSegment];
      if (value !== null && typeof value !== 'undefined') {
        if (! remaining && (typeof value === 'string' || typeof value === 'number')) {
          list.push(value);
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
          for (index = 0, length = value.length; index < length; index++) {
            Helper.getDescendantProperty(value[index], remaining, list);
          }
        } else if (remaining) {
          Helper.getDescendantProperty(value, remaining, list);
        }
      }
    } else {
      list.push(object);
    }

    return list;
  }
}

class FuzzySearch {
  constructor(haystack = [], keys = [], options = {}) {
    if (! Array.isArray(keys)) {
      options = keys;
      keys = [];
    }

    this.haystack = haystack;
    this.keys = keys;
    this.options = Object.assign({
      caseSensitive: false,
      sort: false,
    }, options);
  }

  search(query = '') {
    if (query === '') {
      return this.haystack;
    }

    const results = [];

    for (let i = 0; i < this.haystack.length; i++) {
      const item = this.haystack[i];

      if (this.keys.length === 0) {
        const score = FuzzySearch.isMatch(item, query, this.options.caseSensitive);

        if (score) {
          results.push({ item, score });
        }
      } else {
        for (let y = 0; y < this.keys.length; y++) {
          const propertyValues = Helper.getDescendantProperty(item, this.keys[y]);

          let found = false;

          for (let z = 0; z < propertyValues.length; z++) {
            const score = FuzzySearch.isMatch(propertyValues[z], query, this.options.caseSensitive);

            if (score) {
              found = true;

              results.push({ item, score });

              break;
            }
          }

          if (found) {
            break;
          }
        }
      }
    }

    if (this.options.sort) {
      results.sort((a, b) => a.score - b.score);
    }

    return results.map(result => result.item);
  }

  static isMatch(item, query, caseSensitive) {
    item = String(item);
    query = String(query);

    if (! caseSensitive) {
      item = item.toLocaleLowerCase();
      query = query.toLocaleLowerCase();
    }

    const indexes = FuzzySearch.nearestIndexesFor(item, query);

    if (! indexes) {
      return false;
    }

    // Exact matches should be first.
    if (item === query) {
      return 1;
    }

    // If we have more than 2 letters, matches close to each other should be first.
    if (indexes.length > 1) {
      return 2 + (indexes[indexes.length - 1] - indexes[0]);
    }

    // Matches closest to the start of the string should be first.
    return 2 + indexes[0];
  }

  static nearestIndexesFor(item, query) {
    const letters = query.split('');
    let indexes = [];

    const indexesOfFirstLetter = FuzzySearch.indexesOfFirstLetter(item, query);

    indexesOfFirstLetter.forEach((startingIndex, loopingIndex) => {
      let index = startingIndex + 1;

      indexes[loopingIndex] = [startingIndex];

      for (let i = 1; i < letters.length; i++) {
        const letter = letters[i];

        index = item.indexOf(letter, index);

        if (index === -1) {
          indexes[loopingIndex] = false;

          break;
        }

        indexes[loopingIndex].push(index);

        index++;
      }
    });

    indexes = indexes.filter(letterIndexes => letterIndexes !== false);

    if (! indexes.length) {
      return false;
    }

    return indexes.sort((a, b) => {
      if (a.length === 1) {
        return a[0] - b[0];
      }

      a = a[a.length - 1] - a[0];
      b = b[b.length - 1] - b[0];

      return a - b;
    })[0];
  }

  static indexesOfFirstLetter(item, query) {
    const match = query[0];

    return item.split('').map((letter, index) => {
      if (letter !== match) {
        return false;
      }

      return index;
    }).filter(index => index !== false);
  }
}

var shortcuts = [
    {
        url: 'https://repo.new',
        name: 'Github Repo',
        icon: './icons/github.png',
    },
    {
        url: 'https://codespace.new',
        name: 'Github Codespace',
        icon: './icons/github.png',
    },
    {
        url: 'https://gist.new',
        name: 'Github Gist',
        icon: './icons/github.png',
    },
    {
        url: 'https://pen.new',
        name: 'Codepen',
        icon: './icons/codepen.png',
    },
    {
        url: 'https://deploy.new',
        name: 'Vercel',
        icon: './icons/vercel.png',
    },
    {
        url: 'https://react.new',
        name: 'React CodeSandbox',
        icon: './icons/react.png',
    },
    {
        url: 'https://js.new',
        name: 'JS CodeSandbox',
        icon: './icons/nodedotjs.png',
    },
    {
        url: 'https://ts.new',
        name: 'TS CodeSandbox',
        icon: './icons/typescript.png',
    },
    {
        url: 'https://ng.new',
        name: 'Angular CodeSandbox',
        icon: './icons/angular.png',
    },
    {
        url: 'https://vue.new',
        name: 'Vue CodeSandbox',
        icon: './icons/vuedotjs.png',
    },
    {
        url: 'https://nuxt.new',
        name: 'Nuxt CodeSandbox',
        icon: './icons/nuxtdotjs.png',
    },
    {
        url: 'https://python.new',
        name: 'Python Playground',
        icon: './icons/python.png',
    },
    {
        url: 'https://repl.new',
        name: 'Repl Playground',
        icon: './icons/replit.png',
    },
    {
        url: 'https://linear.new',
        name: 'Linear Dashboard',
    },
    {
        url: 'https://node.new',
        name: 'Nodejs',
        icon: './icons/nodedotjs.png',
    },
    {
        url: 'https://typescriptlang.org/play',
        name: 'Typescript Playground',
        icon: './icons/typescript.png',
    },
    {
        url: 'https://play.rust-lang.org/',
        name: 'Rust Playground',
        icon: './icons/rust.png',
    },
    {
        url: 'https://notion.new',
        name: 'Notion',
        icon: './icons/notion.png',
    },
    {
        url: 'https://doc.new',
        name: 'Google Doc',
        icon: './icons/google.png',
    },
    {
        url: 'https://sheet.new',
        name: 'Google Sheet',
        icon: './icons/googlesheets.png',
    },
    {
        url: 'https://slide.new',
        name: 'Google Slide',
        icon: './icons/google.png',
    },
    {
        url: 'https://meet.new',
        name: 'Google Meeting',
        icon: './icons/googlemeet.png',
    },
    {
        url: 'https://cal.new',
        name: 'Google Calendar',
        icon: './icons/googlecalendar.png',
    },
    {
        url: 'https://word.new',
        name: 'Mircosoft Word',
        icon: './icons/microsoftword.png',
    },
    {
        url: 'https://execl.new',
        name: 'Mircosoft Execl',
        icon: './icons/microsoftexcel.png',
    },
    {
        url: 'https://ppt.new',
        name: 'Mircosoft PPT',
        icon: './icons/microsoftpowerpoint.png',
    },
    {
        url: 'https://story.new',
        name: 'Medium Post',
        icon: './icons/medium.png',
    },
    {
        url: 'https://hackathon.new',
        name: 'Hackathon',
    },
    {
        url: 'https://figma.new',
        name: 'Figma Design',
        icon: './icons/figma.png',
    },
    {
        url: 'https://design.new',
        name: 'Canva',
        icon: './icons/canva.png',
    },
    {
        url: 'https://playlist.new',
        name: 'Spotify Playlist',
        icon: './icons/spotify.png',
    },
];

const searcher = new FuzzySearch(shortcuts, ["name"]);
const results = alfy.input ? searcher.search(alfy.input) : shortcuts;
alfy.output(results.map((item) => {
  return {
    title: item.name,
    subtitle: item.url,
    arg: item.url,
    icon: {
      path: item.icon
    }
  };
}));
