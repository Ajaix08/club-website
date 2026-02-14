import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Event } from '../types';

export default function Events() {
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      if (!supabase) {
        setPastEvents([]);
        setUpcomingEvents([]);
        return;
      }

      const { data: past } = await supabase
        .from('events')
        .select('*')
        .eq('is_upcoming', false)
        .order('event_date', { ascending: false });

      const { data: upcoming } = await supabase
        .from('events')
        .select('*')
        .eq('is_upcoming', true)
        .order('event_date', { ascending: true });

      setPastEvents(past || []);
      setUpcomingEvents(upcoming || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-500">Loading events...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {event.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>{formatTime(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    {event.registration_link && (
                      <a
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Register Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Past Events
              </h2>
              <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  {event.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.event_date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastEvents.length === 0 && upcomingEvents.length === 0 && (
          <div className="text-center text-gray-500">
            <p className="text-xl">No events to display at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
