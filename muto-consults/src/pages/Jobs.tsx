import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary_range: string;
  deadline: string;
}

const Jobs = () => {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Positions</h1>
        <p className="mt-2 text-gray-600">Find your next career opportunity with us</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1B3D]"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No jobs found</h3>
          <p className="mt-1 text-sm text-gray-500">Check back later for new opportunities.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                  <p className="text-gray-600 mt-1">{job.company}</p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  {job.salary_range && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {job.salary_range}
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  to={`/jobs/${job.id}/apply`}
                  className="flex items-center text-[#0A1B3D] hover:text-orange-500"
                >
                  Apply Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;