export const paginate = (tickets, selectedPage) => {
  const itemsPerPage = 10;
  let endIndex = itemsPerPage * selectedPage;
  let startIndex = endIndex - itemsPerPage;
  const pageCount = Math.ceil(tickets.length / 10);
  const data =
    endIndex < tickets.length
      ? tickets.slice(startIndex, endIndex)
      : tickets.slice(startIndex, tickets.length);

  return { pageCount, data };
};
