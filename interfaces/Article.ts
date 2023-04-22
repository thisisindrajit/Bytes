export interface Article {
  id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  category: string | null;
  creator: string | null;
  source: string | null;
  country: string | null;
  keywords: string | null;
  addedToTableAt: string | null;
  summarized_text: string | null;
  predicted_sentiment: string | null;
  predicted_emotion: string | null;
}
