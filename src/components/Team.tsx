import { useState, useEffect } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { TeamMember } from '../types';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      if (!supabase) {
        setTeamMembers([]);
        return;
      }

      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="team" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-500">Loading team...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Core Team
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Dedicated leaders driving innovation and fostering collaboration
          </p>
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {member.position}
                  </p>

                  <div className="space-y-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group/link"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm truncate group-hover/link:underline">
                        {member.email}
                      </span>
                    </a>

                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group/link"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span className="text-sm group-hover/link:underline">
                          LinkedIn Profile
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-xl">Team information coming soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
