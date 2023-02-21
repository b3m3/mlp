const MenuLinks = ({ links }) => {
  return (
    <ul>
      {links.map(({link, name}, i) => (
        <li key={i}>
          <a href={link} target="_blank" rel="noreferrer">{name}</a>
        </li>
      ))}
    </ul>
  );
}

export default MenuLinks;