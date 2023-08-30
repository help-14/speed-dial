import { type Component } from "solid-js"

const SearchBox: Component = () => {
  let searchBox: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined

  const onPress = (key: string): void => {
    const query = (searchBox as HTMLInputElement)?.value?.trim()
    if (query && key === "Enter") {
      window.location.href = `https://google.com/search?q=${query}`
    }
  }

  return (
    <div>
      <input
        ref={searchBox}
        type="text"
        placeholder="🔍 type something to search..."
        onKeyDown={(e) => onPress(e.key)}
        value=""
        style={{
          "background-color": "transparent",
          "border-width": "0",
          "border-bottom": "1px solid white",
          "border-radius": "0",
          width: "100%",
        }}
      />
    </div>
  )
}

export default SearchBox
