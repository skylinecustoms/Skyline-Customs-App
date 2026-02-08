import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function SkylineDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedService, setSelectedService] = useState('All');
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [data, setData] = useState({
    totalRevenue: 12500,
    totalLeads: 156,
    totalCustomers: 23,
    cac: 67.27,
    conversionRate: 14.7,
    averageJobValue: 543.48
  });

  // Time periods
  const timePeriods = ['Daily', '7 Days', 'Week', 'Month', 'Quarter', 'All Time'];
  
  // Services with icons
  const services = [
    { name: 'All', icon: '🎯', color: '#2563eb' },
    { name: 'Window Tint', icon: '🏢', color: '#7c3aed' },
    { name: 'Ceramic Coating', icon: '✨', color: '#059669' },
    { name: 'PPF Protection', icon: '🛡️', color: '#dc2626' }
  ];

  // Channels
  const channels = [
    { name: 'All', color: '#6b7280' },
    { name: 'Paid', color: '#ef4444' },
    { name: 'Organic', color: '#10b981' }
  ];

  // Service performance breakdown
  const serviceData = [
    { service: 'Window Tint', revenue: 4200, leads: 45, customers: 8, avgValue: 525, icon: '🏢', color: '#7c3aed' },
    { service: 'Ceramic Coating', revenue: 5800, leads: 62, customers: 10, avgValue: 580, icon: '✨', color: '#059669' },
    { service: 'PPF Protection', revenue: 2500, leads: 49, customers: 5, avgValue: 500, icon: '🛡️', color: '#dc2626' }
  ];

  // Calculate metrics based on filters
  const getFilteredData = () => {
    if (selectedService === 'All') return data;
    
    const service = serviceData.find(s => s.service === selectedService);
    if (!service) return data;
    
    const cac = service.leads > 0 ? (service.revenue * 0.2) / service.customers : 0;
    const conversionRate = service.leads > 0 ? (service.customers / service.leads) * 100 : 0;
    
    return {
      totalRevenue: service.revenue,
      totalLeads: service.leads,
      totalCustomers: service.customers,
      cac: cac,
      conversionRate: conversionRate,
      averageJobValue: service.avgValue
    };
  };

  const currentData = getFilteredData();

  return (
    <>
      <Head>
        <title>Skyline Customs - Business Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Status bar simulation */}
        <div style={{
          height: '44px',
          background: 'rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          <div style={{ position: 'absolute', left: '20px' }}>9:41</div>
          <div>Skyline Customs</div>
          <div style={{ position: 'absolute', right: '20px' }}>100% 🔋</div>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '28px', 
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              🚗 Skyline Customs
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '16px', 
              opacity: 0.9,
              fontWeight: '500'
            }}>
              Business Intelligence Hub
            </p>
          </div>

          {/* Time Period Selector */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontSize: '16px',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              📊 Time Period
            </label>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px'
            }}>
              {timePeriods.map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '12px 16px',
                    background: selectedPeriod === period 
                      ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' 
                      : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    boxShadow: selectedPeriod === period 
                      ? '0 4px 12px rgba(0,0,0,0.3)'
                      : '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(0.98)';
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Service Filter */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontSize: '16px',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              🔧 Service Type
            </label>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px'
            }}>
              {services.map(service => (
                <button
                  key={service.name}
                  onClick={() => setSelectedService(service.name)}
                  style={{
                    padding: '12px 16px',
                    background: selectedService === service.name 
                      ? `linear-gradient(135deg, ${service.color}, ${service.color}dd)` 
                      : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    boxShadow: selectedService === service.name 
                      ? '0 4px 12px rgba(0,0,0,0.3)'
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{service.icon}</span>
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {/* Channel Filter */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontSize: '16px',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              📈 Lead Source
            </label>
            <div style={{ 
              display: 'flex', 
              gap: '8px'
            }}>
              {channels.map(channel => (
                <button
                  key={channel.name}
                  onClick={() => setSelectedChannel(channel.name)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: selectedChannel === channel.name 
                      ? `linear-gradient(135deg, ${channel.color}, ${channel.color}dd)` 
                      : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    boxShadow: selectedChannel === channel.name 
                      ? '0 4px 12px rgba(0,0,0,0.3)'
                      : '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {channel.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Metrics Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '16px',
            marginBottom: '30px'
          }}>
            <MetricCard 
              title="💰 Revenue" 
              value={`$${currentData.totalRevenue.toLocaleString()}`}
              subtext={`${selectedPeriod.toLowerCase()}`}
              color="#10b981"
            />
            <MetricCard 
              title="👥 Leads" 
              value={currentData.totalLeads.toString()}
              subtext={`${selectedPeriod.toLowerCase()}`}
              color="#3b82f6"
            />
            <MetricCard 
              title="✅ Customers" 
              value={currentData.totalCustomers.toString()}
              subtext="conversions"
              color="#8b5cf6"
            />
            <MetricCard 
              title="📊 CAC" 
              value={`$${currentData.cac.toFixed(0)}`}
              subtext="cost per customer"
              color="#ef4444"
            />
          </div>

          {/* Additional Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '16px',
            marginBottom: '30px'
          }}>
            <MetricCard 
              title="⚡ Conversion" 
              value={`${currentData.conversionRate.toFixed(1)}%`}
              subtext="lead to customer"
              color="#f59e0b"
            />
            <MetricCard 
              title="💵 Avg Job" 
              value={`$${currentData.averageJobValue.toFixed(0)}`}
              subtext="per customer"
              color="#06b6d4"
            />
          </div>

          {/* Service Performance Breakdown */}
          {selectedService === 'All' && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: '700',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                🎯 Service Performance
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {serviceData.map((service, index) => (
                  <ServiceCard key={index} service={service} />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ 
            textAlign: 'center',
            padding: '20px',
            fontSize: '14px',
            opacity: 0.8,
            borderTop: '1px solid rgba(255,255,255,0.2)',
            marginTop: '20px'
          }}>
            Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function MetricCard({ title, value, subtext, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}
    onTouchStart={(e) => {
      e.currentTarget.style.transform = 'scale(0.98)';
    }}
    onTouchEnd={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
    >
      <div style={{ 
        fontSize: '14px', 
        opacity: 0.9,
        marginBottom: '8px',
        fontWeight: '600'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: '700',
        marginBottom: '4px',
        color: color
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '12px', 
        opacity: 0.7,
        fontWeight: '500'
      }}>
        {subtext}
      </div>
    </div>
  );
}

function ServiceCard({ service }) {
  const cac = service.leads > 0 ? (service.revenue * 0.2) / service.customers : 0;
  const conversion = service.leads > 0 ? (service.customers / service.leads) * 100 : 0;
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: '700'
      }}>
        <span style={{ 
          fontSize: '24px', 
          marginRight: '12px',
          padding: '8px',
          background: `${service.color}20`,
          borderRadius: '12px'
        }}>
          {service.icon}
        </span>
        {service.service}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px',
        fontSize: '14px'
      }}>
        <div>
          <div style={{ opacity: 0.7, marginBottom: '4px' }}>Revenue</div>
          <div style={{ fontWeight: '700', color: service.color }}>
            ${service.revenue.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ opacity: 0.7, marginBottom: '4px' }}>Leads</div>
          <div style={{ fontWeight: '700' }}>{service.leads}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7, marginBottom: '4px' }}>Customers</div>
          <div style={{ fontWeight: '700' }}>{service.customers}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7, marginBottom: '4px' }}>CAC</div>
          <div style={{ fontWeight: '700' }}>${cac.toFixed(0)}</div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '12px',
        padding: '12px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px'
      }}>
        <span>Conversion: {conversion.toFixed(1)}%</span>
        <span>Avg: ${service.avgValue}</span>
      </div>
    </div>
  );
}