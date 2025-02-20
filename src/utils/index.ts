export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

export const formatDate = (date: string | Date, formatType: 'word' | 'number' = 'word', separator: string = ' '): string => {
  const dateObj = new Date(date);

  const options: Intl.DateTimeFormatOptions =
    formatType === 'word'
      ? { day: '2-digit', month: 'short', year: 'numeric' }
      : { day: '2-digit', month: '2-digit', year: 'numeric' };

  const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(dateObj);

  if (formatType === 'word') {
    const dateWithCapitalMonth = formattedDate.replace(' г.', '').replace('.', '').replace(/\s/g, separator);
    const parts = dateWithCapitalMonth.split(separator);
    parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    return parts.join(separator);
  } else {
    return formattedDate.replace(/\./g, separator);
  }
};


export const formatPrice = (number: number): string => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const getDeclinedWord = (word: string, count: number): string => {
  const endings = {
    nominative: word,
    genitiveSingular: `${word}а`,
    genitivePlural: `${word}ов`
  };

  if (count % 10 === 1 && count % 100 !== 11) {
    return endings.nominative;
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return endings.genitiveSingular;
  } else {
    return endings.genitivePlural;
  }
};
