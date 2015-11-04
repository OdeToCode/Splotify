using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;

namespace Splotify
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseIISPlatformHandler();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
