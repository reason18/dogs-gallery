import { ItemBox, ItemImage } from "./styled";

interface BreedGalleryItemProps {
  source: string;
  onSelect: (source: string) => void;
}

export const BreedGalleryItem = ({
  source,
  onSelect,
}: BreedGalleryItemProps) => {
  return (
    <ItemBox onClick={() => onSelect(source)}>
      <ItemImage
        alt={source}
        src={`${source}?w=64&h=auto&fit=crop&auto=format`}
        srcSet={`${source}?w=64&h=auto&fit=crop&auto=format&dpr=2 2x`}
        loading="lazy"
      />
    </ItemBox>
  );
};
