import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

interface ApplicationFormData {
  cover_letter: string;
  resume_url: string;
}

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationFormData>();
  const [job, setJob] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      if (!id) return;
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
      setError('Job not found');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!id) return;
    setSubmitting(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to apply');

      const { error: applicationError } = await supabase
        .from('applications')
        .insert([{
          job_id: id,
          user_id: user.id,
          ...data
        }]);

      if (applicationError) throw applicationError;

      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1B3D]"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600">{error || 'Job not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Apply for {job.title}</h1>
        <p className="mt-2 text-gray-600">{job.company} - {job.location}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="resume_url" className="block text-sm font-medium text-gray-700">
            Resume URL
          </label>
          <input
            type="url"
            id="resume_url"
            {...register('resume_url', { required: 'Resume URL is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
            placeholder="https://drive.google.com/your-resume"
          />
          {errors.resume_url && (
            <p className="mt-1 text-sm text-red-600">{errors.resume_url.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            id="cover_letter"
            rows={6}
            {...register('cover_letter', { required: 'Cover letter is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
            placeholder="Write your cover letter here..."
          />
          {errors.cover_letter && (
            <p className="mt-1 text-sm text-red-600">{errors.cover_letter.message}</p>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0A1B3D] hover:bg-[#162C50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A1B3D] disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyJob;