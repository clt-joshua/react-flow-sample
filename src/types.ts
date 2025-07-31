export interface BasicNodeDataProps {
  text: string;
  hasQuickReplies?: boolean;
  slot?: string;
  quickReplies?: {
    text: string;
    value: string;
  }[];
}
