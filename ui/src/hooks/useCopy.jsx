import copyToClipboard from 'copy-to-clipboard';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCopy(text) {
  const copyableString = useRef(text);
  const [copied, setCopied] = useState(false);

  const copyAction = useCallback(() => {
      const copiedString = copyToClipboard(copyableString.current);
      setCopied(copiedString);
  }, [copyableString]);

  useEffect(() => {
      copyableString.current = text;
  }, [text]);

  return [copied, copyAction, setCopied];
}