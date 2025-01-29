
export default function Index() {
  // const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny', 'remastered'];
  const helperText = 
  <>
    <b>What?</b> Flip It Or Rip It is played by opening a pack of trading cards, placing them face down, alternating between Flipping a card face up (where you keep the card) and Ripping a card, so that it is destroyed forever.<br /><br />
    <b>Why?</b> Someone thought that the rush of opening packs wasn't enough, so they adding in the potential of "losing money".<br /><br />
    <b>How?</b> Pick some options from the drop down menus, generate the booster pack, and start clicking! The first card we will FLIP.
  </>;

  return (
    <div className="center m-10">
      {helperText}
    </div>
  );
}