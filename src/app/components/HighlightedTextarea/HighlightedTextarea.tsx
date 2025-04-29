'use client';
import '@ant-design/v5-patch-for-react-19';
import {
  FC,
  FormEvent,
  useEffect,
  useRef,
  useState,
  ClipboardEvent,
} from 'react';
import styles from './HighlightedTextarea.module.css';
import { processText } from './processText';
import { Button, Flex } from 'antd';

interface HighlightedTextareaProps {
  onChange?: (value: string) => void;
  initialValue?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  showCount?: boolean;
  maxLength?: number;
  width?: number;
}

export const HighlightedTextarea: FC<HighlightedTextareaProps> = ({
  onChange,
  initialValue = '',
  resize = 'vertical',
  showCount,
  maxLength,
  width,
}) => {
  const [htmlValue, setHtmlValue] = useState(processText(initialValue));
  const [textLength, setTextLength] = useState(initialValue.length);
  const divRef = useRef<HTMLDivElement>(null);

  const onBeforeInput = (e: FormEvent<HTMLDivElement>) => {
    if (!maxLength) return;
    if (textLength >= maxLength) {
      e.preventDefault();
    }
  };

  const onInput = (e: FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    const processedHtml = processText(text);
    setHtmlValue(processedHtml);
    setTextLength(text.length);
    if (onChange) {
      onChange(text);
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    if (!maxLength) return;
    e.preventDefault();
    if (e.clipboardData) {
      const pasteText = e.clipboardData
        .getData('text')
        .slice(0, maxLength - textLength);
      if (divRef.current) {
        const currentText = divRef.current.innerText;
        const newText = (currentText + pasteText).slice(0, maxLength);
        divRef.current.innerText = newText;
        setCursorToEnd(divRef.current);
        const processedHtml = processText(newText);
        setHtmlValue(processedHtml);
        setTextLength(newText.length);
        if (onChange) {
          onChange(newText);
        }
      }
    }
  };

  function setCursorToEnd(el: HTMLElement) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selected = window.getSelection();
    selected?.removeAllRanges();
    selected?.addRange(range);
  }

  const isEmpty = !htmlValue || htmlValue === '<br>' || htmlValue === '';

  useEffect(() => {
    if (divRef.current && divRef.current.innerHTML !== htmlValue) {
      divRef.current.innerHTML = htmlValue;
      setCursorToEnd(divRef.current);
    }
  }, [htmlValue, textLength, maxLength]);

  return (
    <Flex vertical gap="small">
      <Flex vertical style={{ width: `${width ? `${width}px` : 'auto'}` }}>
        <div
          className={`${styles.textarea} ${
            styles[`textarea__resize_${resize}`]
          } ${isEmpty ? styles.placeholder : ''}`}
          ref={divRef}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={onInput}
          onBeforeInput={onBeforeInput}
          onPaste={onPaste}
          role="textbox"
          aria-multiline="false"
          spellCheck={false}
          data-placeholder="Enter text..."
        />
        {showCount && (
          <div className={styles.textarea__charCount}>
            {textLength} {maxLength && ` / ${maxLength}`}
          </div>
        )}
      </Flex>
      <Button
        onClick={() => {
          setHtmlValue('');
          if (onChange) {
            onChange('');
          }
        }}
        className={styles.textarea__button}>
        Clear
      </Button>
    </Flex>
  );
};
