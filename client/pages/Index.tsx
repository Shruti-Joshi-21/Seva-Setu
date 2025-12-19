import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginDialog from "@/components/LoginDialog";
import {
  MapPin,
  TrendingUp,
  ClipboardList,
  CheckCircle2,
  Calendar,
  BarChart3,
  Users,
  Settings,
  Crown,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="relative w-full min-h-[800px] bg-seva-green flex items-center justify-center overflow-hidden">
          <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-seva-green-bg">Streamline Your </span>
                <span className="text-seva-yellow">Field</span>
                <br />
                <span className="text-seva-green-bg">Operations</span>
              </h1>

              <p className="text-lg lg:text-xl text-seva-green-bg leading-relaxed">
                Comprehensive attendance tracking, leave management, task
                planning, and reporting system designed specifically for
                environmental NGOs and field operations.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 shadow-sm">
                  <MapPin className="w-4 h-4 text-seva-green" />
                  <span className="text-sm font-medium text-seva-gray-darker">
                    Location Tracking
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 shadow-sm">
                  <TrendingUp className="w-4 h-4 text-seva-green" />
                  <span className="text-sm font-medium text-seva-gray-darker">
                    Real-time Analytics
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 shadow-sm">
                  <ClipboardList className="w-4 h-4 text-seva-green" />
                  <span className="text-sm font-medium text-seva-gray-darker">
                    Task Management
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-[616px] aspect-square rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/5e06ff4e5903327abb16eef9f9c1c0a55b878829?width=1232"
                  alt="Field workers collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-20">
          <div className="max-w-[1152px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-seva-gray-darker mb-3">
                Access Your Dashboard
              </h2>
              <p className="text-xl text-seva-gray-dark">
                Choose your role to get started with SevaSetu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-seva-green-bg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-seva-green-light">
                <div className="w-20 h-20 bg-seva-green-light rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-seva-gray-darker mb-4">
                  Volunteer
                </h3>
                <p className="text-base text-seva-gray-dark mb-6 leading-relaxed">
                  Access your attendance records, submit daily reports, and
                  manage your field activities.
                </p>
                <ul className="w-full space-y-3 mb-8 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green-light mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Clock in/out with location
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green-light mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Submit daily reports
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green-light mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Request leave
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green-light mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      View assigned tasks
                    </span>
                  </li>
                </ul>
                <LoginDialog
                  role="Volunteer"
                  buttonText="Login as Volunteer"
                  themeColor="#81C784"
                  backgroundColor="#F1F8E9"
                  route="/volunteer-dashboard"
         
                />

              </div>

              <div className="bg-seva-green-bg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-seva-green">
                <div className="w-20 h-20 bg-seva-green rounded-full flex items-center justify-center mb-6">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-seva-gray-darker mb-4">
                  Team Lead
                </h3>
                <p className="text-base text-seva-gray-dark mb-6 leading-relaxed">
                  Manage your team, assign tasks, approve leave requests, and
                  monitor field operations.
                </p>
                <ul className="w-full space-y-3 mb-8 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Team attendance overview
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Task assignment & tracking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Leave approval workflow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Team performance reports
                    </span>
                  </li>
                </ul>
                  <LoginDialog
                    role="Team Lead"
                    buttonText="Login as Team Lead"
                    themeColor="#246427"
                    backgroundColor="#F1F8E9"
                    route="/teamlead-dashboard"
                   
                  />

              </div>

              <div className="bg-seva-green-bg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-seva-yellow">
                <div className="w-20 h-20 bg-seva-yellow rounded-full flex items-center justify-center mb-6">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-seva-gray-darker mb-4">
                  Administrator
                </h3>
                <p className="text-base text-seva-gray-dark mb-6 leading-relaxed">
                  Full system access with analytics, user management, and
                  organizational oversight.
                </p>
                <ul className="w-full space-y-3 mb-8 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Organization-wide analytics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      User & role management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      System configuration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-seva-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-seva-gray-dark">
                      Advanced reporting
                    </span>
                  </li>
                </ul>
                <LoginDialog
                  role="Admin"
                  buttonText="Login as Admin"
                  themeColor="#F8AC3B"
                  backgroundColor="#FFF8E1"
                  route="/admin-dashboard"
        
                />

              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-seva-green-bg py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-seva-gray-darker mb-3">
                Powerful Features for Field Operations
              </h2>
              <p className="text-xl text-seva-gray-dark">
                Everything you need to manage environmental field work
                efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-seva-green-light rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-seva-green" />
                </div>
                <h3 className="text-xl font-semibold text-seva-gray-darker mb-2">
                  Location Tracking
                </h3>
                <p className="text-base text-seva-gray-dark leading-relaxed">
                  GPS-enabled attendance with real-time location verification
                  for field activities.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-seva-green-light rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-seva-green-light" />
                </div>
                <h3 className="text-xl font-semibold text-seva-gray-darker mb-2">
                  Leave Management
                </h3>
                <p className="text-base text-seva-gray-dark leading-relaxed">
                  Streamlined leave requests, approvals, and balance tracking
                  for all team members.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-seva-yellow rounded-full flex items-center justify-center mb-4">
                  <ClipboardList className="w-8 h-8 text-seva-yellow" />
                </div>
                <h3 className="text-xl font-semibold text-seva-gray-darker mb-2">
                  Task Planning
                </h3>
                <p className="text-base text-seva-gray-dark leading-relaxed">
                  Assign, track, and manage daily tasks with progress monitoring
                  and deadlines.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-seva-green rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-seva-green" />
                </div>
                <h3 className="text-xl font-semibold text-seva-gray-darker mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-base text-seva-gray-dark leading-relaxed">
                  Comprehensive insights and automated reports for performance
                  tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
