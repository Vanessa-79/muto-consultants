import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

interface ProfileFormData {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string;
}

const Profile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [applications, setApplications] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchProfile();
    fetchApplications();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'skills' && Array.isArray(value)) {
            setValue(key as keyof ProfileFormData, value.join(', '));
          } else {
            setValue(key as keyof ProfileFormData, value as string);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (
            title,
            company,
            location
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const skills = data.skills.split(',').map(skill => skill.trim());

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...data,
          skills,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) throw upsertError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving your profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1B3D]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-2 text-gray-600">Update your personal information</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                {...register('full_name', { required: 'Full name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                {...register('location')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                {...register('bio')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                id="skills"
                {...register('skills')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0A1B3D] hover:bg-[#162C50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A1B3D] disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Applications</h2>
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-lg shadow-sm border p-4"
              >
                <h3 className="font-semibold text-gray-900">{application.jobs.title}</h3>
                <p className="text-gray-600">{application.jobs.company}</p>
                <p className="text-gray-500 text-sm">{application.jobs.location}</p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    application.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : application.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <p className="text-gray-500">No applications yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;