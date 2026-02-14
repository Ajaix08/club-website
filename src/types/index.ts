export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  linkedin_url?: string;
  image_url?: string;
  display_order: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  image_url?: string;
  is_upcoming: boolean;
  registration_link?: string;
}
