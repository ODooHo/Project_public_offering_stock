package api.stock.stock.global.config;

import api.stock.stock.global.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(Customizer.withDefaults())
                .csrf((csrf) -> csrf.disable())
                .httpBasic((httpBasic) -> httpBasic.disable())
                .sessionManagement((sessionManagement)
                        -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorizeHttpRequests)
                        -> authorizeHttpRequests.requestMatchers("/", "/api/auth/**").permitAll()
                        .requestMatchers( "/","/api/myPage/**").authenticated()
                        .requestMatchers("/","/api/stock/getFavor").authenticated()
                        .requestMatchers(".","/api/stock/addFavor").authenticated()
                        .requestMatchers(HttpMethod.PATCH,"api/community/**").authenticated()
                        .requestMatchers(HttpMethod.POST,"api/community/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"api/community/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"api/stock/**").authenticated()
                        //.requestMatchers(HttpMethod.GET,"api/community/board/delete/**").authenticated()
                        .anyRequest().permitAll());
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
