"use client";

import { CategoryIcon } from "./MenuIcons";

export default function MenuCategoryNav({
  categories,
  activeId,
  onSelect,
}) {
  const tabs = [{ id: "all", label: "All", icon: "all" }, ...categories];

  return (
    <nav className="menu-cat-nav" aria-label="Menu categories">
      <ul className="menu-cat-nav__list">
        {tabs.map((cat) => {
          const active = cat.id === activeId;
          return (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onSelect(cat.id)}
                className={`menu-cat-nav__btn${active ? " is-active" : ""}`}
                aria-pressed={active}
              >
                <span className="menu-cat-nav__icon">
                  <CategoryIcon type={cat.icon || cat.id} />
                </span>
                <span className="menu-cat-nav__label">{cat.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
