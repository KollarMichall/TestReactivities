using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profiles.Profile>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessot;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessot = userAccessor;
            }

            public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Profiles.Profile>();
                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings.Where(x => x.Target.UserName == request.Username)
                        .Select(x => x.Observer)
                        .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new {currenUsername = _userAccessot.GetUsername()})
                        .ToListAsync(cancellationToken: cancellationToken);
                        break;
                    case "following":
                        profiles = await _context.UserFollowings.Where(x => x.Observer.UserName == request.Username)
                        .Select(x => x.Target)
                        .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new {currenUsername = _userAccessot.GetUsername()})
                        .ToListAsync(cancellationToken: cancellationToken);
                        break;
                }

                return Result<List<Profiles.Profile>>.Success(profiles);
            }

        }
    }
}