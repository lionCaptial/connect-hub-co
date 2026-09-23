type CsaPlaceholderProps = { label: string };

export function CsaPlaceholder({ label }: CsaPlaceholderProps) {
  return <span data-csa-placeholder>[{label}]</span>;
}
